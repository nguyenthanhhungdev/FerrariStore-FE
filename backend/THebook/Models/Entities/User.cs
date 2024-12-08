using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using THebook.Models.Enums;

namespace THebook.Models.Entities {
    public class User : BaseDbModel {
        [BsonElement("firstname")]
        [JsonPropertyName("firstname")]
        public string? FirstName { get; set; } = null!;

        [BsonElement("lastname")]
        [JsonPropertyName("lastname")]
        public string? LastName { get; set; } = null!;

        [BsonElement("username")]
        [JsonPropertyName("username")]
        public string? UserName { get; set; } = null!;

        [BsonElement("email")]
        [JsonPropertyName("email")]
        public string? Email { get; set; } = null!;

        [BsonElement("password")]
        [JsonPropertyName("password")]
        public string? Password { get; set; } = null!;

        [BsonElement("avatar")]
        [JsonPropertyName("avatar")]
        public string? Avatar { get; set; } = null!;

        [BsonElement("gender")]
        [JsonPropertyName("gender")]
        public string? Gender { get; set; } = null!;

        [BsonElement("phone")]
        [JsonPropertyName("phone")]
        public string? Phone { get; set; } = null!;
     
        [BsonElement("birthday")]
        [JsonPropertyName("birthday")]
        public string? Birthday { get; set; } = null!;

        [BsonElement("status")]
        [JsonPropertyName("status")]
        public Boolean? Status { get; set; } = null!;

        [BsonElement("role")]
        [JsonPropertyName("role")]
        public string? Role { get; set; } = null!;

        
    }
}