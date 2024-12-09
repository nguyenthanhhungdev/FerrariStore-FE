using AutoWrapper.Wrappers;
using FluentValidation;
using FluentValidation.AspNetCore;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;

namespace THebook.Infrastructure
{
    public static class ControllerExtensions
    {
        public static async Task<ValidationResult> ValidateAndThrowAsync<T>(
            this ControllerBase @this,
            IValidator<T> validator,
            T instance
        )
        {
            if (!@this.ModelState.IsValid)
            {
                throw new ApiProblemDetailsException(@this.ModelState);
            }
            var result = await validator.ValidateAsync(instance);
            if (!result.IsValid)
            {
                result.AddToModelState(@this.ModelState);
                throw new ApiProblemDetailsException(@this.ModelState);
            }
            return result;
        }
    }
}
