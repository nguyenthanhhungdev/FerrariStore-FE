using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

#pragma warning disable IDE0130 // Namespace does not match folder structure
namespace THebook.Models
#pragma warning restore IDE0130 // Namespace does not match folder structure
{
    public class Category : BaseDbModel
    {
        [BsonElement("name")]
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null!;
    }
}
