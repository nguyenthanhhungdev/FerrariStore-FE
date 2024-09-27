namespace THebook.Services;

using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using THebook.Models;
using THebook.Repository;

public class MongoDBService
{
    private readonly IMongoCollection<User> _userCollection;

    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings)
    {
        MongoClient client = new MongoClient(mongoDBSettings.Value.ConnectionURI);
        IMongoDatabase database = client.GetDatabase(mongoDBSettings.Value.DatabaseName);
        _userCollection = database.GetCollection<User>(mongoDBSettings.Value.CollectionName);
    }

    public async Task<List<User>> GetAsync()
    {
        return await _userCollection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task CreateAsync(User playlist) { }

    public async Task AddToPlaylistAsync(string id, string movieId) { }

    public async Task DeleteAsync(string id) { }
}
