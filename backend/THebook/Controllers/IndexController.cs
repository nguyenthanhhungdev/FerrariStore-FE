using Microsoft.AspNetCore.Mvc;

namespace THebook.Controllers
{
    [Route("")]
    public class DefaultController : Controller
    {
        [HttpGet]
        [ApiExplorerSettings(IgnoreApi = true)]
        public RedirectResult RedirectToSwaggerUi()
        {
            return RedirectPreserveMethod("/swagger");
        }
    }
}
