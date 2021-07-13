using System.Collections.Generic;

namespace Cognizant.Models
{
    public class ApiResponseError
    {
        public string Message { get; set; }

        public IDictionary<string, string> ValidationErrors { get; set; }
    }
}
