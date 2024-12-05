using MongoDB.Driver;
using MongoDB.Infrastructure;

namespace BanSach.Repository;

public class BanSachContext(
    IMongoClient client,
    IMongoDatabase database,
    IMongoDbContextOptions options
) : MongoDbContext(client, database, options) { }
