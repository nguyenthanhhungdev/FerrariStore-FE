using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities
{
    public class Category : BaseDbModel
    {
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement("format")]
        [JsonPropertyName("format")]
        public string? Format { get; set; } = null!;
    }
}
