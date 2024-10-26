using THebook.Models.Entities;
using THebook.Models.Queries;

namespace THebook.Repository
{
    public interface ITagRepository : ICrudRepository<TagEntity>
    {
        Task<TagEntity?> FindByNameAsync(string name);
        Task<IEnumerable<TagEntity>> FindAsync(TagCriteria criteria);
    }
}
