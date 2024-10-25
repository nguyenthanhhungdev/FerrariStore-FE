using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using THebook.Models.Entities;
using THebook.Models.Queries;

namespace THebook.Repository;

public partial class TagRepository(
    MongoDbCollection collection,
    MongoDbContext context,
    ILogger<TagRepository> logger
) : CrudRepository<TagEntity>(collection.Tags, context), ITagRepository
{
    private readonly ILogger<TagRepository> _logger = logger;

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
        return await _collection.Find(tag => tag.Name == name.ToLower()).FirstOrDefaultAsync();
    }

    [LoggerMessage(Level = LogLevel.Debug, Message = "Find all with criteria {Criteria}.")]
    static partial void LogTagCriteria(ILogger logger, TagCriteria criteria);
}
