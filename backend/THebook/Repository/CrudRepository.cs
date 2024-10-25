using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using THebook.Models;

namespace THebook.Repository;

public partial class CrudRepository<T>(IMongoCollection<T> collection, MongoDbContext context)
    : ICrudRepository<T>
    where T : BaseDbModel
{
    protected readonly IMongoCollection<T> _collection = collection;
    protected readonly MongoDbContext _context = context;

    public async Task<IEnumerable<T>> FindAllAsync()
    {
        return await _collection.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<T?> FindByIdAsync(string id)
    {
        return await _collection.Find(document => document.Id == id).FirstOrDefaultAsync();
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

    public async Task<IEnumerable<T>> EfcFindAllAsync()
    {
        return await _context.Set<T>().ToListAsync();
    }

    public async Task<T?> EfcFindByIdAsync(string id)
    {
        return await _context.Set<T>().Where(entity => entity.Id == id).FirstOrDefaultAsync();
    }

    public async Task<int> EfcInsertAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
        return await _context.SaveChangesAsync();
    }

    [LoggerMessage(Level = LogLevel.Debug, Message = "Find fluent generated {findFluent}.")]
    protected static partial void LogFinder(ILogger logger, IFindFluent<T, T> findFluent);
}
