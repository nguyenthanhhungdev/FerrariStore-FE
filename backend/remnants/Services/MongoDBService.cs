namespace THebook.Services;

using Microsoft.Extensions.Options;
using MongoDB.Driver;
using THebook.Repository;

/**
 *
 *
 * Tạo ra 2 biến:
 * Client dùng để kết nối đến MongoDB
 * Database dùng để thao tác với database bằng cách sử dụng Client
 * 
 */


public class MongoDBService
{
    private MongoClient Client { get; }
    public IMongoDatabase Database { get; }

    public MongoDBService(IOptions<MongoDBSettings> mongoDbSettings)
    {
        Client = new MongoClient(mongoDbSettings.Value.ConnectionURI);
        Database = Client.GetDatabase(mongoDbSettings.Value.DatabaseName);
    }
}
