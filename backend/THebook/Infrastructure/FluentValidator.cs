using FluentValidation;

namespace THebook.Infrastructure
{
    public class ObjectIdValidator : AbstractValidator<string?>
    {
        public ObjectIdValidator()
        {
            RuleFor(str => str)
                .Matches("^[0-9a-fA-F]{24}$")
                .WithMessage("Invalid MongoDB ObjectId format.");
        }
    }
}
