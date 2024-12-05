using BanSach.Model;

namespace BanSach.Repository
{
    public interface IGenreRepository : ICrudRepository<Genre>
    {
        Task<Genre?> FindByNameAsync(string name);
    }
}
