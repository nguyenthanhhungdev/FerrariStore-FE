using MongoDB.Infrastructure;
using MongoDB.UnitOfWork;
using THebook.Models.Entities;
using THebook.Models.Queries;
using THebook.Repository;

namespace THebook.Services
{
    public class CategoryService(
        ICategoryRepository categoryRepository,
        IMongoDbUnitOfWork<ThEbookContext> unitOfWork
    )
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Category>> GetAsync(CategoryRequestCriteria criteria)
        {
            return await _categoryRepository.FindAsync(criteria);
        }

        public async Task<Category?> GetByIdAsync(string id)
        {
            return await _categoryRepository.FindByIdAsync(id);
        }

        public async Task<IMongoDbSaveChangesResult> AddAsync(CategoryRequest category)
        {
            await _categoryRepository.InsertDtoAsync(category);
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> UpdateAsync(
            string id,
            CategoryRequest category
        )
        {
            await _categoryRepository.ReplaceWithDtoAsync(id, category);
            return await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IMongoDbSaveChangesResult> DeleteAsync(string id)
        {
            await _categoryRepository.DeleteByIdAsync(id);
            return await _unitOfWork.SaveChangesAsync();
        }
    }
}
