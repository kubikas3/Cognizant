using Cognizant.Models;
using Microsoft.EntityFrameworkCore;

namespace Cognizant.Contexts
{
    public class ChallengeContext : DbContext
    {
        public DbSet<Result> Results { get; set; }

        public ChallengeContext(DbContextOptions<ChallengeContext> options) : base(options)
        {
        }
    }
}
