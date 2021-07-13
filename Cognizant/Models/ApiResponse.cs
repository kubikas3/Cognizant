namespace Cognizant.Models
{
    public class ApiResponse
    {
        public object Result { get; set; }

        public ApiResponseError Error { get; set; }
    }
}
