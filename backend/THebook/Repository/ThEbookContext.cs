using MongoDB.Driver;
using MongoDB.Infrastructure;

namespace THebook.Repository;

public class ThEbookContext(
    IMongoClient client,
    IMongoDatabase database,
    IMongoDbContextOptions options
) : MongoDbContext(client, database, options) { }
