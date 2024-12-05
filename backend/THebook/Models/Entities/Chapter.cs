using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities {
    public class Chapter : BaseDbModel {
       [BsonElement("cover")]
        [JsonPropertyName("cover")]
        public string? Cover { get; set; } = null!;

       [BsonElement("title")]
        [JsonPropertyName("title")]
        public string? Title { get; set; } = null!;

       [BsonElement("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; } = null!;

       [BsonElement("pages")]
        [JsonPropertyName("pages")]
        public string? Pages { get; set; } = null!;

       [BsonElement("link")]
        [JsonPropertyName("link")]
        public string[]? Link { get; set; } = [];

       [BsonElement("count")]
        [JsonPropertyName("count")]
        public int? Count { get; set; } = null!;

       [BsonElement("rating")]
        [JsonPropertyName("rating")]
        public string? Rating { get; set; } = null!;

       
    }
}