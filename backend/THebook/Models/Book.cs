using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;

        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement("authors")]
        [JsonPropertyName("authors")]
        public string? Authors { get; set; } = null!;

        [BsonElement("year")]
        [JsonPropertyName("year")]
        public int? Year { get; set; } = null!;
    }
}
