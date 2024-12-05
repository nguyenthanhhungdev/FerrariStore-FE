using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models.Entities {
    public class Notification : BaseDbModel {
       [BsonElement("title")]
        [JsonPropertyName("title")]
        public string? Title { get; set; } = null!;

      
       
    }
}