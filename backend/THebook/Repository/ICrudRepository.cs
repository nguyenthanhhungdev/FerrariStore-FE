using MongoDB.Driver;
using MongoDB.Repository;
using THebook.Models;

namespace THebook.Repository
{
    public interface ICrudRepository<T> : IMongoDbRepository<T>
        where T : BaseDbModel
    {
        // cach dung IMongoCollection
        Task<IEnumerable<T>> FindAllAsync();
        Task<T?> FindByIdAsync(string id);

        // cach dung IMongoQueryable
        Task<IEnumerable<T>> SearchAllAsync();
        Task<T?> SearchByIdAsync(string id);

        Task<object> InsertAsync(T entity);
        Task<object> ReplaceByIdAsync(string id, T entity);
        Task<object> DeleteByIdAsync(string id);
        IMongoCollection<T> AggregateCollection { get; }
    }
}
