using THebook.Models.Queries;

namespace THebook.Common;

using AutoWrapper.Wrappers;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Mvc.ModelBinding;

public class ObjectIdValidator : AbstractValidator<string?>
{
    public ObjectIdValidator()
    {
        RuleFor(str => str)
            .Matches("^[0-9a-fA-F]{24}$")
            .WithMessage("Invalid MongoDB ObjectId format.");
    }
}

public class QueryObjectIdValidator : AbstractValidator<QueryObjectId>
{
    public QueryObjectIdValidator()
    {
        RuleFor(str => str.Id).SetValidator(new ObjectIdValidator());
    }
}

public class TagCriteriaValidator : AbstractValidator<TagCriteria>
{
    public TagCriteriaValidator()
    {
        RuleFor(x => x.Id).SetValidator(new ObjectIdValidator());

        RuleForEach(x => x.Ids).SetValidator(new ObjectIdValidator());
    }
}

public static class ValidationHelper
{
    public static async Task ValidateAndThrowAsync<T>(
        IValidator<T> validator,
        ModelStateDictionary modelState,
        T instance
    )
    {
        var result = await validator.ValidateAsync(instance);
        if (!result.IsValid)
        {
            result.AddToModelState(modelState);
            throw new ApiProblemDetailsException(modelState);
        }
    }
}
