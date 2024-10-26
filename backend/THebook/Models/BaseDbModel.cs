using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace THebook.Models
{
    public class BaseDbModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } = null!;
    }
}
