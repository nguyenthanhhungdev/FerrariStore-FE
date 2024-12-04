using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.UnitOfWork;
using THebook.Models.Entities;
using THebook.Models.Queries;

namespace THebook.Repository;

public partial class TagRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<TagRepository> logger,
    IMongoDbUnitOfWork<ThEbookContext> unitOfWork
) : CrudRepository<TagEntity>(context, mongoDbSettings, logger), ITagRepository
{
    private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;

    public async Task<IEnumerable<TagEntity>> FindAsync(TagCriteria criteria)
    {
        LogTagCriteria(_logger, criteria);
        var builder = Builders<TagEntity>.Filter;
        if (!string.IsNullOrEmpty(criteria.Id))
        {
            return await _collection.Find(tag => tag.Id == criteria.Id).ToListAsync();
        }
        var filter =
            criteria.Ids.Length != 0 || criteria.Names.Length != 0
                ? builder.In(tag => tag.Id, criteria.Ids)
                    | builder.In(tag => tag.Name, criteria.Names)
                : builder.Empty;
        var finder = _collection.Find(filter);
        LogFinder(_logger, finder);
        return await finder.ToListAsync();
    }

    public async Task<TagEntity?> FindByNameAsync(string name)
    {
        return await _collection.Find(tag => tag.Name == name).FirstOrDefaultAsync();
    }

    [LoggerMessage(Level = LogLevel.Debug, Message = "Find all with criteria {Criteria}.")]
    static partial void LogTagCriteria(ILogger logger, TagCriteria criteria);
}
