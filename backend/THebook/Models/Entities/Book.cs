using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities
{
    public class Book : BaseDbModel
    {
        [BsonElement("title")]
        [JsonPropertyName("title")]
        public string? Title { get; set; } = null!;

        [BsonElement("description")]
        [JsonPropertyName("description")]
        public string? Description { get; set; } = null!;

        [BsonElement("cover_image")]
        [JsonPropertyName("cover_image")]
        public string? CoverImage { get; set; } = null!;

        [BsonElement("published_year")]
        [JsonPropertyName("published_year")]
        public int? PublishedYear { get; set; } = null!;

        [BsonElement("original_language")]
        [JsonPropertyName("original_language")]
        public string? OriginalLanguage { get; set; } = null!;

        [BsonElement("created_at")]
        [JsonPropertyName("created_at")]
        public DateTime? CreatedAt { get; set; } = null!;

        [BsonElement("updated_at")]
        [JsonPropertyName("updated_at")]
        public DateTime? UpdatedAt { get; set; } = null!;

        [BsonElement("authors")]
        [JsonPropertyName("authors")]
        public string[]? Authors { get; set; } = [];
    }
}
