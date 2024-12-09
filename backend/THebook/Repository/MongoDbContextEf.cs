using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MongoDB.EntityFrameworkCore.Extensions;
using THebook.Models.Entities;

namespace THebook.Repository
{
    public class MongoDbContextEf(
        DbContextOptions dbContextOptions,
        IOptions<MongoDbSettings> mongoDbSettings
    ) : DbContext(dbContextOptions)
    {
        private MongoDbSettings MongoDbSettings { get; init; } = mongoDbSettings.Value;
        public required DbSet<Category> Categories { get; init; }
        public required DbSet<Book> Books { get; init; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder
                .Entity<Category>()
                .ToCollection(MongoDbSettings.CollectionNames[nameof(Category)]);
            modelBuilder.Entity<Book>().ToCollection(MongoDbSettings.CollectionNames[nameof(Book)]);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) =>
            options.UseMongoDB(MongoDbSettings.ConnectionString, MongoDbSettings.DatabaseName);
    }
}
