using BanSach.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Repository;

namespace BanSach.Repository;

public class GenreRepository(
    BanSachContext context,
    IMongoDbRepositoryOptions<Genre> options,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<GenreRepository> logger
) : CrudRepository<Genre>(context, options, mongoDbSettings, logger), IGenreRepository
{
    public async Task<Genre?> FindByNameAsync(string name)
    {
        return await Collection.Find(genre => genre.Name == name).SingleOrDefaultAsync();
    }

    public async Task<Genre?> SearchByNameAsync(string name)
    {
        return await AsQueryable.Where(genre => genre.Name == name).SingleOrDefaultAsync();
    }
}
