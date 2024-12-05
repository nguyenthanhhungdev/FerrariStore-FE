using BanSach.Repository;

namespace BanSach.Repository
{
    public class MongoDbSettings : IMongoDbSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public Dictionary<string, string> CollectionNames { get; set; } = [];
        public string ConnectTimeout { get; set; } = null!;
        public int LoggingMaxDocumentSize { get; set; }
    }
}
