using THebook.Models.Tests;

namespace THebook.Repository.Tests
{
    public interface IBookTestRepository : ICrudRepository<BookTest> { 
        public Task<IEnumerable<string?>> GetBooksName();
    }
}
