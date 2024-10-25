using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Core.Configuration;
using THebook.Models;
using THebook.Models.Entities;

namespace THebook.Repository;

public class MongoDbCollection
{
    // private MongoDbSettings MongoDbSettings { get; init; }
    // private MongoClient MongoClient { get; init; }
    private IMongoDatabase MongoDatabase { get; init; }

    public IMongoCollection<TagEntity> Tags { get; init; }
    public IMongoCollection<BookDb> Books { get; init; }

    public MongoDbCollection(
        IOptions<MongoDbSettings> mongoDbSettings,
        ILoggerFactory loggerFactory
    )
    {
        var settings = MongoClientSettings.FromConnectionString(
            mongoDbSettings.Value.ConnectionURI
        );
        // https://stackoverflow.com/a/77537230
        settings.LoggingSettings = new LoggingSettings(loggerFactory, 10_000);
        MongoDatabase = new MongoClient(settings).GetDatabase(mongoDbSettings.Value.DatabaseName);

        Tags = MongoDatabase.GetCollection<TagEntity>(mongoDbSettings.Value.CollectionNames["Tag"]);
        Books = MongoDatabase.GetCollection<BookDb>(mongoDbSettings.Value.CollectionNames["Book"]);
    }
}
