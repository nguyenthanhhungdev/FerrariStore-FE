using System.Text.Json;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using THebook.Infrastructure;

namespace THebook.Models.Queries;

public class CategoryRequestCriteria
{
    [FromQuery(Name = "id")]
    public string? Id { get; set; } = null;

    [FromQuery(Name = "ids")]
    public string[] Ids { get; set; } = [];

    [FromQuery(Name = "names")]
    public string[] Names { get; set; } = [];
}

public class QueryCategoryCriteriaValidator : AbstractValidator<CategoryRequestCriteria>
{
    public QueryCategoryCriteriaValidator()
    {
        RuleFor(x => x.Id).SetValidator(new ObjectIdValidator());
        RuleForEach(x => x.Ids).SetValidator(new ObjectIdValidator());
        RuleForEach(x => x.Names).NotEmpty();
    }
}
