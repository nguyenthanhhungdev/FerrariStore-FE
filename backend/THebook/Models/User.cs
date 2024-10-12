using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;

        [BsonElement("username")]
        [JsonPropertyName("username")]
        public string? Username { get; set; } = null!;

        [BsonElement("email")]
        [JsonPropertyName("email")]
        public string? Email { get; set; } = null!;

        [BsonElement("password")]
        [JsonPropertyName("password")]
        public string? Password { get; set; } = null!;

        [BsonElement("full_name")]
        [JsonPropertyName("full_name")]
        public string? FullName { get; set; } = null!;

        [BsonElement("role")]
        [JsonPropertyName("role")]
        public string? Role { get; set; } = null!;

        [BsonElement("created_at")]
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updated_at")]
        [JsonPropertyName("updated_at")]
        public DateTime UpdatedAt { get; set; }
    }
}