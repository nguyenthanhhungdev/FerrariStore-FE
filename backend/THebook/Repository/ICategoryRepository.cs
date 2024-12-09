using THebook.Models.Entities;
using THebook.Models.Queries;

namespace THebook.Repository
{
    public interface ICategoryRepository : ICrudRepository<Category>
    {
        Task<IEnumerable<Category>> FindAsync(CategoryRequestCriteria criteria);
        Task<object> InsertDtoAsync(CategoryRequest category);
        Task<object> ReplaceWithDtoAsync(string id, CategoryRequest category);
    }
}
