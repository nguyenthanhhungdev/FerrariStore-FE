using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using THebook.Models;
using THebook.Models.Entities;

namespace THebook.Repository;

public class MongoDbCollection
{
    // private MongoDbSettings MongoDbSettings { get; init; }
    private MongoClient MongoClient { get; init; }

    // private IMongoDatabase MongoDatabase { get; init; }
    private readonly List<Func<Task>> _commands = [];

    public IMongoCollection<TagEntity> Tags { get; init; }
    public IMongoCollection<BookDb> Books { get; init; }

    public MongoDbCollection(
        IOptions<MongoDbSettings> mongoDbSettings,
        ILoggerFactory loggerFactory
    )
    {
        var settings = MongoClientSettings.FromConnectionString(
            mongoDbSettings.Value.ConnectionUri
        );
        // https://stackoverflow.com/a/77537230
        settings.LoggingSettings = new LoggingSettings(
            loggerFactory,
            mongoDbSettings.Value.MaxCharacterQueryLog
        );
        settings.ConnectTimeout = TimeSpan2.Parse(mongoDbSettings.Value.ConnectionTimeout);
        MongoClient = new MongoClient(settings);
        var MongoDatabase = MongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

        Tags = MongoDatabase.GetCollection<TagEntity>(mongoDbSettings.Value.CollectionNames["Tag"]);
        Books = MongoDatabase.GetCollection<BookDb>(mongoDbSettings.Value.CollectionNames["Book"]);
    }
}
