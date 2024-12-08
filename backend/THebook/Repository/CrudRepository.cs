using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;
using THebook.Models;

namespace THebook.Repository;

// Unhandled exception. System.ArgumentException: Implementation constraint has not been satisfied.
//    at MongoDB.Repository.Extensions.MongoDbRepositoryServiceCollectionExtensions.AddCustomMongoDbRepository[TService,TImplementation](IServiceCollection services, Func`2 implementationFactory, ServiceLifetime serviceLifetime)
//    at Program.<Main>$(String[] args) in /workspaces/backend/THebook/Program.cs:line 118

public abstract partial class CrudRepository<T> : MongoDbRepository<T>, ICrudRepository<T>
    where T : BaseDbModel
{
    // dung collection binh thuong cho nhung tac vu READ
    protected readonly IMongoCollection<T> _collection;
    protected readonly ILogger<CrudRepository<T>> _logger;
    protected readonly IOptions<MongoDbSettings> _settings;

    protected readonly IMongoDbRepositoryOptions<T>? _options;
    protected IMongoQueryable<T> AsQueryable
    {
        get { return Collection.AsQueryable(); }
    }

    public IMongoCollection<T> AggregateCollection => _collection;

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

    public CrudRepository(
        ThEbookContext context,
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
        return await Collection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<T?> FindByIdAsync(string id)
    {
        return await Collection.Find(entity => entity.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<T>> SearchAllAsync()
    {
        return await AsQueryable.ToListAsync();
    }

    public async Task<T?> SearchByIdAsync(string id)
    {
        return await AsQueryable.Where(entity => entity.Id == id).SingleOrDefaultAsync();
    }

    public async Task<object> InsertAsync(T entity)
    {
        // tac vu WRITE, nen dung method cua MongoDbRepository de co ket noi uow
        // await _collection.InsertOneAsync(entity);
        return await InsertOneAsync(entity);
    }

    public async Task<object> ReplaceByIdAsync(string id, T entity)
    {
        // tac vu WRITE, nen dung method cua MongoDbRepository de co ket noi uow
        // await _collection.ReplaceOneAsync(document => document.Id == id, entity);
        return await ReplaceOneAsync(entity => entity.Id == id, entity);
    }

    public async Task<object> DeleteByIdAsync(string id)
    {
        // tac vu WRITE, nen dung method cua MongoDbRepository de co ket noi uow
        // await _collection.DeleteOneAsync(document => document.Id == id);
        return await DeleteOneAsync(entity => entity.Id == id);
    }

    // lay collection dung cho aggeration (vi la collection rieng nen k anh huong uow)
    public IMongoCollection<T> GetAggregateCollection()
    {
        return _collection;
    }
}
