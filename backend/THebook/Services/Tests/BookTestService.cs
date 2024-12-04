using MongoDB.UnitOfWork;
using THebook.Models.Tests;
using THebook.Repository;
using THebook.Repository.Tests;

namespace THebook.Services.Tests
{
    public class BookTestService(
        IBookTestRepository bookRepository,
        IMongoDbUnitOfWork<ThEbookContext> unitOfWork
    )
    {
        private readonly IBookTestRepository _bookRepository = bookRepository;
        private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;
        private IBookTestRepository UowBookRepository
        {
            get { return _unitOfWork.CustomRepository<IBookTestRepository>(); }
        }

        public async Task<IEnumerable<BookTest>> GetAsync()
        {
            // tac vu READ, nen co the dung repo tu tao ma ko thong qua uow
            return await _bookRepository.FindAllAsync();
        }

        public async Task<IEnumerable<string?>> GetNameAsync()
        {
            // tac vu READ, nen co the dung repo tu tao ma ko thong qua uow
            return await _bookRepository.GetBooksName();
        }

        public async Task AddAsync(BookTest book)
        {
            // tac vu WRITE, nen co ket noi uow
            await UowBookRepository.InsertAsync(book);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(string id, BookTest book)
        {
            // tac vu WRITE, nen co ket noi uow
            await UowBookRepository.ReplaceAsync(id, book);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task RemoveAsync(string id)
        {
            // tac vu WRITE, nen co ket noi uow
            await _bookRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
