using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using THebook.Models;
// using Microsoft.EntityFrameworkCore;
// using MongoDB.EntityFrameworkCore.Extensions;
using THebook.Models.Entities;

namespace THebook.Repository
{
    // public class MongoDbContext : DbContext
    // {
    //     public DbSet<Tag> Tags { get; init; }

    //     public MongoDbContext(DbContextOptions options)
    //         : base(options) { }

    //     protected override void OnModelCreating(ModelBuilder modelBuilder)
    //     {
    //         base.OnModelCreating(modelBuilder);
    //         modelBuilder.Entity<Tag>().ToCollection("tag");
    //     }
    // }
    public class MongoDbContext
    {
        private IMongoClient Client { get; init; }
        private IMongoDatabase Database { get; init; }

        public IMongoCollection<TagEntity> Tags { get; init; }
        public IMongoCollection<BookDb> Books { get; init; }

        public MongoDbContext(IOptions<MongoDBSettings> mongoDbSettings)
        {
            var s = mongoDbSettings.Value;

            Client = new MongoClient(s.ConnectionURI);
            Database = Client.GetDatabase(s.DatabaseName);

            Tags = Database.GetCollection<TagEntity>(s.CollectionNames["Tag"]);
            Books = Database.GetCollection<BookDb>(s.CollectionNames["Book"]);
        }
    }
}
