using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using FluentValidation;
using THebook.Models.Enums;

namespace THebook.Models.Queries;

public class CategoryRequest
{
    [JsonPropertyName("name")]
    [Required(AllowEmptyStrings = false)]
    public string? Name { get; set; } = null!;

    [JsonPropertyName("description")]
    [Required(AllowEmptyStrings = false)]
    public string? Description { get; set; } = null!;

    [JsonPropertyName("group")]
    [EnumDataType(typeof(CategoryGroup))]
    public CategoryGroup? Group { get; set; } = null!;
}

public class CategoryRequestObjectValidator : AbstractValidator<CategoryRequest>
{
    public CategoryRequestObjectValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Description).NotEmpty();
        RuleFor(x => x.Group).IsInEnum();
    }
}
