using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace BanSach.Model
{
    public class Genre : BaseDbModel
    {
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; } = null!;

        [BsonElement("is_active")]
        [JsonPropertyName("is_active")]
        public string? IsActive { get; set; } = null!;
    }
}
