using Cognizant.Models;
using System.Threading.Tasks;

namespace Cognizant.Services
{
    public interface IJdoodleService
    {
        public Task<Result> Execute(Solution solution);
    }
}
