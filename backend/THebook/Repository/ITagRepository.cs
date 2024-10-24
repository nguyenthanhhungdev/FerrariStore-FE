using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using THebook.Models.Entities;

namespace THebook.Repository
{
    public interface ITagRepository
    {
        Task<List<TagEntity>> FindAsync();
        Task<TagEntity?> FindByIdAsync(string id);
        Task<TagEntity?> FindByNameAsync(string id);
        Task InsertAsync(TagEntity tag);
        Task ReplaceAsync(string id, TagEntity tag);
        Task DeleteAsync(string id);
    }
}
