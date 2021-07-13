using Cognizant.Models;
using Cognizant.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cognizant.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChallengeController : ControllerBase
    {
        private readonly ILogger<ChallengeController> _logger;
        private readonly IChallengeService _challengeService;

        public ChallengeController(ILogger<ChallengeController> logger, IChallengeService challengeService)
        {
            _logger = logger;
            _challengeService = challengeService;
        }

        [HttpGet]
        public ActionResult Get()
        {
            var response = new ApiResponse();
            try
            {
                response.Result = _challengeService.GetResults()
                    .Select(res => new ResultDto
                    {
                        Name = res.Name,
                        Output = res.Output,
                        CpuTime = res.CpuTime,
                        Memory = res.Memory
                    });
                return Ok(response);
            }
            catch
            {
                response.Error = new ApiResponseError { Message = "Internal server error." };
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }

        [HttpPost]
        [Route("/challenge/submitTask")]
        public async Task<ActionResult> SubmitTask([FromBody]SolutionDto request)
        {
            var response = new ApiResponse();

            if (!ModelState.IsValid)
            {
                response.Error = new ApiResponseError
                {
                    Message = "Validation error occured.",
                    ValidationErrors = new Dictionary<string, string>(ModelState
                        .Select(k => new KeyValuePair<string, string>(k.Key, k.Value.Errors.FirstOrDefault().ErrorMessage)))
                };

                return StatusCode(StatusCodes.Status422UnprocessableEntity, response);
            }

            try
            {
                var executeResponse = await _challengeService.SubmitTask(new TaskInfo
                {
                    Name = request.Name,
                    Script = request.Script
                });
                response.Result = new ResultDto
                {
                    Name = executeResponse.Name,
                    Output = executeResponse.Output,
                    CpuTime = executeResponse.CpuTime,
                    Memory = executeResponse.Memory
                };

                return Ok(response);
            }
            catch
            {
                response.Error = new ApiResponseError { Message = "Internal server error." };
                return StatusCode(StatusCodes.Status500InternalServerError, response);
            }
        }
    }
}
