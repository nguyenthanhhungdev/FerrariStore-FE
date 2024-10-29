namespace THebook.Infrastructure
{
    public interface IMongoUnitOfWork : IDisposable
    {
        Task<int> SaveChangesAsync();
    }
}
