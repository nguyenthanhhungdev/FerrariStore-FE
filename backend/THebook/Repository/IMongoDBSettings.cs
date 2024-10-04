namespace THebook.Repository;

public interface IMongoDBSettings
{
    string ConnectionURI { get; set; }
    string DatabaseName { get; set; }
    Dictionary<string, string> CollectionNames { get; set; }
}