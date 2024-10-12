namespace THebook.Repository
{

    public class MongoDBSettings : IMongoDBSettings
    {
        public string ConnectionURI { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public Dictionary<string, string> CollectionNames { get; set; } = new Dictionary<string, string>();
    }
}