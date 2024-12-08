using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities {
    public class Author : BaseDbModel {
       [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;

       [BsonElement("bio")]
        [JsonPropertyName("bio")]
        public string? Bio { get; set; } = null!;

       [BsonElement("link")]
        [JsonPropertyName("link")]
        public string[]? Link { get; set; } = [];
    }
}