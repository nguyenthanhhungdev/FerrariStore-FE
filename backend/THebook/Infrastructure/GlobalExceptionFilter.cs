using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace THebook.Common;

public class GlobalExceptionFilter : IExceptionFilter
{
    private readonly ILogger<GlobalExceptionFilter> _logger;

    public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
    {
        _logger = logger;
    }

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
