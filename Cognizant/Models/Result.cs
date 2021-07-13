using System.ComponentModel.DataAnnotations;

namespace Cognizant.Models
{
    public class Result
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public string Output { get; set; }
        
        public string CpuTime { get; set; }

        public string Memory { get; set; }

        public int StatusCode { get; set; }
        
        public string Error { get; set; }
    }
}
