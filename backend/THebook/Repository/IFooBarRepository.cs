using THebook.Models.Entities;

namespace THebook.Repository;

public interface IFooRepository : ICrudRepository<Foo> { }

public interface IFooBarRepository : ICrudRepository<BarDb>
{
    public Task<IEnumerable<Bar>> GetBars();
}
