using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models
{
    public class Author
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;

        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement("biography")]
        [JsonPropertyName("biography")]
        public string? Biography { get; set; } = null!;
        
        [BsonElement("books")]
        [JsonPropertyName("books")]
        public string[]? Books { get; set; } = null!;
    }
}