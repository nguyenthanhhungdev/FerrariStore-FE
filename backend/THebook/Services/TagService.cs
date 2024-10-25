using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using THebook.Models.Entities;
using THebook.Models.Queries;
using THebook.Repository;

namespace THebook.Services
{
    public class TagService
    {
        private readonly ITagRepository _tagRepository;

        public TagService(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        public async Task<IEnumerable<TagEntity>> GetTagsAsync(TagCriteria criteria)
        {
            return await _tagRepository.FindAsync(criteria);
        }

        public async Task<TagEntity?> GetTagByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("Tag ID cannot be null or empty", nameof(id));
            }

            return await _tagRepository.FindByIdAsync(id);
        }

        public async Task AddTagAsync(TagEntity tag)
        {
            if (tag == null)
            {
                throw new ArgumentNullException(nameof(tag), "Tag cannot be null");
            }

            if (string.IsNullOrEmpty(tag.Name))
            {
                throw new ArgumentException("Tag name cannot be null or empty", nameof(tag.Name));
            }

            var existingTag = await _tagRepository.FindByNameAsync(tag.Name);
            if (existingTag != null)
            {
                throw new InvalidOperationException($"Tag with name '{tag.Name}' already exists");
            }

            await _tagRepository.InsertAsync(tag);
        }

        public async Task UpdateTagAsync(string id, TagEntity tag)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("Tag ID cannot be null or empty", nameof(id));
            }

            if (tag == null)
            {
                throw new ArgumentNullException(nameof(tag), "Tag cannot be null");
            }

            var existingTag = await _tagRepository.FindByIdAsync(id);
            if (existingTag == null)
            {
                throw new InvalidOperationException($"Tag with ID '{id}' does not exist");
            }

            await _tagRepository.ReplaceAsync(id, tag);
        }

        public async Task DeleteTagAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("Tag ID cannot be null or empty", nameof(id));
            }

            var existingTag = await _tagRepository.FindByIdAsync(id);
            if (existingTag == null)
            {
                throw new InvalidOperationException($"Tag with ID '{id}' does not exist");
            }

            await _tagRepository.DeleteAsync(id);
        }
    }
}
