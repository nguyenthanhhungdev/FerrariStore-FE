using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
