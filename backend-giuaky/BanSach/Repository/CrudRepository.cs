using BanSach.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Repository;

namespace BanSach.Repository;

public abstract partial class CrudRepository<T> : MongoDbRepository<T>, ICrudRepository<T>
    where T : BaseDbModel
{
    // dung collection binh thuong cho nhung tac vu READ
    protected readonly IMongoCollection<T> _collection;
    protected readonly ILogger<CrudRepository<T>> _logger;
    protected readonly IOptions<MongoDbSettings> _settings;

    protected readonly IMongoDbRepositoryOptions<T>? _options;

    public CrudRepository(
        BanSachContext context,
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

    public CrudRepository(
        BanSachContext context,
        IMongoDbRepositoryOptions<T> options,
        IOptions<MongoDbSettings> mongoDbSettings,
        ILogger<CrudRepository<T>> logger
    )
        : base(context, options)
    {
        _collection = Context.GetCollection<T>(options.CollectionName);
        _logger = logger;
        _options = options;
        _settings = mongoDbSettings;
    }

    public async Task<IEnumerable<T>> FindAllAsync()
    {
        // tac vu READ, nen co the dung collecton rieng
        var f = _collection.Find(new BsonDocument());
        LogFinder(_logger, f);
        return await f.ToListAsync();
    }

    public async Task<T?> FindByIdAsync(string id)
    {
        // tac vu READ, nen co the dung collecton rieng
        var f = _collection.Find(document => document.Id == id);
        LogFinder(_logger, f);
        return await f.FirstOrDefaultAsync();
    }

    public async Task InsertAsync(T entity)
    {
        // tac vu WRITE, nen dung method cua MongoDbRepository de co ket noi uow
        // await _collection.InsertOneAsync(entity);
        await InsertOneAsync(entity);
    }

    public async Task ReplaceAsync(string id, T entity)
    {
        // tac vu WRITE, nen dung method cua MongoDbRepository de co ket noi uow
        // await _collection.ReplaceOneAsync(document => document.Id == id, entity);
        await ReplaceOneAsync(document => document.Id == id, entity);
    }

    public async Task DeleteAsync(string id)
    {
        // tac vu WRITE, nen dung method cua MongoDbRepository de co ket noi uow
        // await _collection.DeleteOneAsync(document => document.Id == id);
        await DeleteOneAsync(document => document.Id == id);
    }

    // lay collection dung cho aggeration (vi la collection rieng nen k anh huong uow)
    public IMongoCollection<T> GetAggregateCollection()
    {
        return _collection;
    }

    [LoggerMessage(Level = LogLevel.Debug, Message = "Find fluent generated {findFluent}.")]
    protected static partial void LogFinder(ILogger logger, IFindFluent<T, T> findFluent);
}
