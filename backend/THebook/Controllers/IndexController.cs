using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

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
