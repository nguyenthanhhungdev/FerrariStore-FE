using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.UnitOfWork;
using THebook.Models.Entities;

namespace THebook.Repository;

public partial class FooRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<FooRepository> logger
) : CrudRepository<Foo>(context, mongoDbSettings, logger), IFooRepository { }

public partial class FooBarRepository(
    ThEbookContext context,
    IOptions<MongoDbSettings> mongoDbSettings,
    ILogger<FooBarRepository> logger,
    IMongoDbUnitOfWork<ThEbookContext> unitOfWork,
    IFooRepository fooRepository
) : CrudRepository<BarDb>(context, mongoDbSettings, logger), IFooBarRepository
{
    private readonly IMongoDbUnitOfWork<ThEbookContext> _unitOfWork = unitOfWork;
    private readonly IFooRepository _fooRepository = fooRepository;

    private IAggregateFluent<Bar> GetDefaultPipeline()
    {
        // MongoDB.Driver.Linq.ExpressionNotSupportedException: Expression not supported: asField.Children.
        var collectionName = _settings.Value.CollectionNames[nameof(BarDb)];
        return _collection
            .Aggregate()
            .Lookup<BarDb, Foo, Bar>(
                _fooRepository.GetAggregateCollection(),
                localField => localField.FooId,
                foreignField => foreignField.Id,
                @as => @as.Foo
            )
            // comment if decide to override "foo" instead of making an extra field "foo_object" FooBar.cs
            .AppendStage<Bar>(new BsonDocument { { "$unset", "foo" } })
            .Unwind(
                field => field.Foo,
                new AggregateUnwindOptions<Bar> { PreserveNullAndEmptyArrays = true }
            );
    }

    public async Task<IEnumerable<Bar>> GetBars()
    {
        return await GetDefaultPipeline().ToListAsync();
    }
}
