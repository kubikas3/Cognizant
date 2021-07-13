using Cognizant.Contexts;
using Cognizant.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Cognizant.Services
{
    public class ChallengeService : IChallengeService
    {
        private readonly ChallengeContext _context;
        private readonly IJdoodleService _jdoodleService;

        public ChallengeService(ChallengeContext context, IJdoodleService jdoodleService)
        {
            _context = context;
            _jdoodleService = jdoodleService;
        }

        public IQueryable<Result> GetResults()
        {
            return _context.Results.AsQueryable();
        }

        public async Task<TaskResult> SubmitTask(TaskInfo taskInfo)
        {
            var executionResult = await _jdoodleService.Execute(new Solution
            {
                Script = taskInfo.Script,
                Language = "csharp"
            });
            executionResult.Name = taskInfo.Name;

            await _context.AddAsync(executionResult);
            await _context.SaveChangesAsync();

            var result = new TaskResult
            {
                Name = executionResult.Name,
                Output = executionResult.Output,
                CpuTime = executionResult.CpuTime,
                Memory = executionResult.Memory
            };

            return result;
        }
    }
}
