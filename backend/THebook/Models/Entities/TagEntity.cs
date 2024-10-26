using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using THebook.Models.Enums;

namespace THebook.Models.Entities
{
    public class TagEntity : BaseDbModel
    {
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

        [BsonElement("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; } = null!;

        [BsonElement("group")]
        [JsonPropertyName("group")]
        public TagGroup Group { get; set; }
    }
}
