using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.EntityFrameworkCore.Extensions;
using THebook.Models;
using THebook.Models.Entities;

namespace THebook.Repository
{
    public class MongoDbContextEf(
        DbContextOptions dbContextOptions,
        IOptions<MongoDbSettings> mongoDbSettings
    ) : DbContext(dbContextOptions)
    {
        private MongoDbSettings MongoDbSettings { get; init; } = mongoDbSettings.Value;
        public DbSet<TagEntity> Tags { get; init; }
        public DbSet<BookDb> Books { get; init; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<TagEntity>().ToCollection(MongoDbSettings.CollectionNames["Tag"]);
            modelBuilder.Entity<BookDb>().ToCollection(MongoDbSettings.CollectionNames["Book"]);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
            options.UseMongoDB(MongoDbSettings.ConnectionString, MongoDbSettings.DatabaseName);
    }
}
