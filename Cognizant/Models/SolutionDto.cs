using System.ComponentModel.DataAnnotations;

namespace Cognizant.Models
{
    public class SolutionDto
    {
        [Required(ErrorMessage = "This one is required.")]
        public string Name { get; set; }

        //[Required(ErrorMessage = "This field is required.")]
        //public string Task { get; set; }

        [Required(ErrorMessage = "This one is required.")]
        public string Script { get; set; }
    }
}
