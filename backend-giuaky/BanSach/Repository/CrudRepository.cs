using BanSach.Model;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.QueryBuilder;
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
    protected IMongoQueryable<T> AsQueryable
    {
        get { return Collection.AsQueryable(); }
    }

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

    public async Task<object> ReplaceByIdAsync(string id, T entity)
    {
        return await ReplaceOneAsync(entity => entity.Id == id, entity);
    }

    public async Task<object> DeleteByIdAsync(string id)
    {
        return await DeleteOneAsync(entity => entity.Id == id);
    }
}
