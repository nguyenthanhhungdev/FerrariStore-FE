using BanSach.Model;
using BanSach.Repository;
using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;

namespace BanSach.Services
{
    public class TagService(IMongoDbUnitOfWork<BanSachContext> unitOfWork)
    {
        private readonly IMongoDbUnitOfWork<BanSachContext> Uow = unitOfWork;
        private IGenreRepository Repo
        {
            get { return Uow.CustomRepository<IGenreRepository>(); }
        }

        public async Task<IEnumerable<Genre>> GetAsync()
        {
            return await Repo.SearchAllAsync();
        }

        public async Task<Genre?> GetByIdAsync(string id)
        {
            return await Repo.SearchByIdAsync(id);
        }

        public async Task<Genre?> GetByNameAsync(string name)
        {
            return await Repo.SearchByNameAsync(name);
        }

        public async Task AddAsync(Genre genre)
        {
            if (await Repo.AnyAsync(genre => genre.Name == genre.Name))
            {
                throw new InvalidOperationException(
                    $"Genre with name '{genre.Name}' already exists"
                );
            }
            genre.Id = null;
            await Repo.InsertOneAsync(genre);
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(string id, Genre genre)
        {
            await Repo.ReplaceByIdAsync(id, genre);
            return await Uow.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await Repo.DeleteByIdAsync(id);
            return await Uow.SaveChangesAsync();
        }
    }
}
