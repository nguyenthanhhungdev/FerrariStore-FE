namespace THebook.Repository;

public interface IMongoDbSettings
{
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
    Dictionary<string, string> CollectionNames { get; set; }
}
