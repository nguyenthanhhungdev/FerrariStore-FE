using BanSach.Model;
using MongoDB.Driver;
using MongoDB.Repository;

namespace BanSach.Repository
{
    public interface ICrudRepository<T> : IMongoDbRepository<T>
        where T : BaseDbModel
    {
        Task<IEnumerable<T>> FindAllAsync();
        Task<T?> FindByIdAsync(string id);
        Task InsertAsync(T entity);
        Task ReplaceAsync(string id, T entity);
        Task DeleteAsync(string id);
        IMongoCollection<T> GetAggregateCollection();
    }
}