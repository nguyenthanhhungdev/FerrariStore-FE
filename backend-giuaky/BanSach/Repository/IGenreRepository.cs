using BanSach.Models;

namespace BanSach.Repository
{
    public interface IGenreRepository : ICrudRepository<Genre>
    {
        public Task<Genre?> FindByNameAsync(string name);
        public Task<Genre?> SearchByNameAsync(string name);
    }
}
