using MongoDB.UnitOfWork;
using THebook.Models.Entities;
using THebook.Repository;

namespace THebook.Services
{
    public class FooBarService(
        IFooRepository fooRepository,
        IFooBarRepository barDbRepository,
        IMongoDbUnitOfWork<ThEbookContext> unitOfWork
    )
    {
        private readonly IFooRepository _fooRepository = fooRepository;
        private readonly IFooBarRepository _barDbRepository = barDbRepository;
        private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;

        public async Task CreateOneLevelNestOk(string barName, string fooName)
        {
            // dung unit of work de insert 2 cai cung luc
            var fooRepository = _unitOfWork.CustomRepository<IFooRepository>();
            var foo = new Foo { Name = fooName };
            await fooRepository.InsertOneAsync(foo);
            var barDbRepository = _unitOfWork.CustomRepository<IFooBarRepository>();
            await barDbRepository.InsertOneAsync(new BarDb { Name = barName, FooId = foo.Id });
            await _unitOfWork.SaveChangesAsync();
        }

        // test save changes cua unit of work
        public async Task CreateOneLevelNestError(string barName, string fooName)
        {
            // dung unit of work de insert 2 cai cung luc
            var fooRepository = _unitOfWork.CustomRepository<IFooRepository>();
            var foo = new Foo { Name = fooName };
            await fooRepository.InsertOneAsync(foo);
            var barDbRepository = _unitOfWork.CustomRepository<IFooBarRepository>();
            await barDbRepository.InsertOneAsync(new BarDb { Name = barName, FooId = foo.Id });
            throw new NotImplementedException(
                "CreateOneLevelNestError always error route. Should not make any database writes."
            );
#pragma warning disable CS0162 // Unreachable code detected
            await _unitOfWork.SaveChangesAsync();
#pragma warning restore CS0162 // Unreachable code detected
        }

        public async Task<FooBar> Get()
        {
            return new FooBar
            {
                Foos = await _fooRepository.FindAllAsync(),
                Bars = await _barDbRepository.GetBars(),
            };
        }
    }
}
