using Cognizant.Config;
using Cognizant.Models;
using Microsoft.Extensions.Options;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Cognizant.Services
{
    public class JdoodleService : IJdoodleService
    {
        private readonly HttpClient _httpClient;
        private readonly JdoodleOptions _options;

        public JdoodleService(HttpClient httpClient, IOptions<JdoodleOptions> options)
        {
            httpClient.BaseAddress = new Uri(options.Value.BaseUrl);
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _options = options.Value;
            _httpClient = httpClient;
        }

        public async Task<Result> Execute(Solution solution)
        {
            var request = new 
            {
                ClientId = _options.ClientId,
                ClientSecret = _options.ClientSecret,
                Script = solution.Script,
                Language = solution.Language,
                VersionIndex = 3
            };

            var result = new Result();
            var jsonOptions = new JsonSerializerOptions()
            {
                PropertyNameCaseInsensitive = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            using (var content = new StringContent(JsonSerializer.Serialize(request, jsonOptions), Encoding.UTF8, "application/json"))
            using (var response = await _httpClient.PostAsync("execute", content))
            {
                var json = await response.Content.ReadAsStringAsync();
                result = JsonSerializer.Deserialize<Result>(json, jsonOptions);
            }

            return result;
        }
    }
}
