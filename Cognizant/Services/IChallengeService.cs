using Cognizant.Models;
using System.Linq;
using System.Threading.Tasks;

namespace Cognizant.Services
{
    public interface IChallengeService
    {
        public Task<TaskResult> SubmitTask(TaskInfo taskInfo);
        public IQueryable<Result> GetResults();
    }
}
