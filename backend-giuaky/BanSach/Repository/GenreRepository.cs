using BanSach.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.UnitOfWork;

namespace BanSach.Repository;

public partial class GenreRepository(
    BanSachContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<GenreRepository> logger,
    IMongoDbUnitOfWork<BanSachContext> unitOfWork
) : CrudRepository<Genre>(context, mongoDbSettings, logger), IGenreRepository
{
    private readonly IMongoDbUnitOfWork<BanSachContext> _unitOfWork = unitOfWork;

    Task<Genre?> IGenreRepository.FindByNameAsync(string name)
    {
        throw new NotImplementedException();
    }
}
