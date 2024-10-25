namespace THebook.Repository
{

    public class MongoDbSettings : IMongoDbSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public Dictionary<string, string> CollectionNames { get; set; } = new Dictionary<string, string>();
    }
}