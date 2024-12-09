using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using THebook.Models.Entities;
using THebook.Models.Queries;

namespace THebook.Repository;

public partial class CategoryRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<CategoryRepository> logger
) : CrudRepository<Category>(context, mongoDbSettings, logger), ICategoryRepository
{
    public async Task<IEnumerable<Category>> FindAsync(CategoryRequestCriteria criteria)
    {
        if (!string.IsNullOrEmpty(criteria.Id))
        {
            return await AsQueryable.Where(c => c.Id == criteria.Id).ToListAsync();
        }
        if (criteria.Ids.Length > 0 || criteria.Names.Length > 0)
        {
            return await AsQueryable
                .Where(c => criteria.Ids.Contains(c.Id) && criteria.Names.Contains(c.Name))
                .ToListAsync();
        }
        return await AsQueryable.ToListAsync();
    }

    public async Task<object> InsertDtoAsync(CategoryRequest category)
    {
        var newCategory = new Category
        {
            Name = category.Name,
            Description = category.Description,
            Group = category.Group,
        };
        return await InsertAsync(newCategory);
    }

    public async Task<object> ReplaceWithDtoAsync(string id, CategoryRequest category)
    {
        var newCategory = new Category
        {
            Name = category.Name,
            Description = category.Description,
            Group = category.Group,
        };
        return await ReplaceByIdAsync(id, newCategory);
    }
}
