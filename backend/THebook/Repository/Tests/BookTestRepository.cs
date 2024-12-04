using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;
using THebook.Models.Tests;

namespace THebook.Repository.Tests;

public partial class BookTestRepository(
    IMongoDbRepositoryOptions<BookTest> options,
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<CrudRepository<BookTest>> logger
) : CrudRepository<BookTest>(context, options, mongoDbSettings, logger), IBookTestRepository
{
    public async Task<IEnumerable<string?>> GetBooksName()
    {
        return await _collection.AsQueryable().Select(book => book.Name).ToListAsync();
    }
}
