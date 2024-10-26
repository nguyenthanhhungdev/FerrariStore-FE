namespace THebook.Repository
{

    public class MongoDbSettings : IMongoDbSettings
    {
        public string ConnectionUri { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public Dictionary<string, string> CollectionNames { get; set; } = [];
    }
}