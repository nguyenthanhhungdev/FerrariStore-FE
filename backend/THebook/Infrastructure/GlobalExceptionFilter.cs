using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace THebook.Infrastructure;

public class GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger) : IExceptionFilter
{
    private readonly ILogger<GlobalExceptionFilter> _logger = logger;

    public void OnException(ExceptionContext context)
    {
        switch (context.Exception)
        {
            case FormatException f:
                _logger.LogWarning(f, "");
                context.Result = new UnprocessableEntityObjectResult(f.Message);
                context.ExceptionHandled = true;
                break;
        }
    }
}
