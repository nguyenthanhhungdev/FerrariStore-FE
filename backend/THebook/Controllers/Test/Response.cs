using Microsoft.AspNetCore.Mvc;
using THebook.Models;
using THebook.Models.Enums;

namespace THebook.Controllers.Test
{
    [ApiController]
    [Route("test")]
    public class Response : ControllerBase
    {
        [HttpGet]
        [Route("")]
        [Route("success")]
        [HttpGet("ok")]
        public IDictionary<string, string> GetSuccess()
        {
            return new Dictionary<string, string> { { "Hello", "World" } };
        }

        [HttpGet]
        [Route("error")]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetError()
        {
            throw new NotImplementedException("This is a test error for middleware handling.");
        }

        [HttpGet]
        [Route("language")]
        public IList<Language> GetLanguage()
        {
            return Enum.GetValues<Language>();
        }
    }
}
