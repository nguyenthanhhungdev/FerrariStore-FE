using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Repository;
using THebook.Models;

namespace THebook.Repository;

public partial class CrudRepository<T> : MongoDbRepository<T>, ICrudRepository<T>
    where T : BaseDbModel
{
    protected readonly IMongoCollection<T> _collection;
    protected readonly ILogger<CrudRepository<T>> _logger;
    protected readonly IOptions<MongoDbSettings> _settings;

    public CrudRepository(
        ThEbookContext context,
        IOptions<MongoDbSettings> mongoDbSettings,
        ILogger<CrudRepository<T>> logger
    )
        : base(context)
    {
        _collection = Context.GetCollection<T>(
            mongoDbSettings.Value.CollectionNames[typeof(T).Name]
        );
        _logger = logger;
        _settings = mongoDbSettings;
    }

    public async Task<IEnumerable<T>> FindAllAsync()
    {
        var f = _collection.Find(new BsonDocument());
        LogFinder(_logger, f);
        return await f.ToListAsync();
    }

    public async Task<T?> FindByIdAsync(string id)
    {
        var f = _collection.Find(document => document.Id == id);
        LogFinder(_logger, f);
        return await f.FirstOrDefaultAsync();
    }

    public async Task InsertAsync(T entity)
    {
        await _collection.InsertOneAsync(entity);
    }

    public async Task ReplaceAsync(string id, T entity)
    {
        await _collection.ReplaceOneAsync(document => document.Id == id, entity);
    }

    public async Task DeleteAsync(string id)
    {
        await _collection.DeleteOneAsync(document => document.Id == id);
    }

    public IMongoCollection<T> GetAggregateCollection()
    {
        return _collection;
    }

    [LoggerMessage(Level = LogLevel.Debug, Message = "Find fluent generated {findFluent}.")]
    protected static partial void LogFinder(ILogger logger, IFindFluent<T, T> findFluent);
}
