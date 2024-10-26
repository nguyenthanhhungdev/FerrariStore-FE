using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace THebook.Models.Queries;

public class QueryObjectId
{
    public string? Id { get; set; } = null;
}

public class TagCriteria
{
    [FromQuery(Name = "id")]
    public string? Id { get; set; } = null;

    [FromQuery(Name = "ids")]
    public string[] Ids { get; set; } = [];

    [FromQuery(Name = "names")]
    public string[] Names { get; set; } = [];

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}
