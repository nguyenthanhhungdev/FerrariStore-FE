using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace THebook.Models.Queries;

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
