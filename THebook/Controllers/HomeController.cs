using Microsoft.AspNetCore.Mvc;

namespace THebook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        [HttpGet(Name = "HomePage")]
        public IDictionary<string, string> Get([FromQuery] string? name) =>
            new Dictionary<string, string>
            {
                { "Hello", "World" },
                { "Me may", "Beo" },
                { "Ten me may", name! },
            };
    }
}
