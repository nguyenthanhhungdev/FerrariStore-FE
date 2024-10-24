using MongoDB.Bson;
using MongoDB.Driver;
using THebook.Models.Entities;
using THebook.Repository;

public class TagRepository : ITagRepository
{
    private readonly MongoDbContext _context;

    public TagRepository(MongoDbContext context)
    {
        _context = context;
    }

    public async Task<List<TagEntity>> FindAsync()
    {
        return await _context.Tags.Find(new BsonDocument()).ToListAsync();
    }

    public async Task<TagEntity?> FindByIdAsync(string id)
    {
        return await _context.Tags.Find(tag => tag.Id == id).FirstOrDefaultAsync();
    }

    public async Task<TagEntity?> FindByNameAsync(string name)
    {
        return await _context.Tags.Find(tag => tag.Name == name.ToLower()).FirstOrDefaultAsync();
    }

    public async Task InsertAsync(TagEntity tag)
    {
        await _context.Tags.InsertOneAsync(tag);
    }

    public async Task ReplaceAsync(string id, TagEntity tag)
    {
        await _context.Tags.ReplaceOneAsync(tag => tag.Id == id, tag);
    }

    public async Task DeleteAsync(string id)
    {
        await _context.Tags.DeleteOneAsync(id);
    }
}
