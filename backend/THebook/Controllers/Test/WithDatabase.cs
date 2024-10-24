using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace THebook.Controllers.Test
{
    [ApiController]
    [Route("test/db")]
    public class WithDatabase : ControllerBase
    {
        [HttpGet]
        [Route("tag")]
        [Route("tags")]
        public IDictionary<string, string> GetTags()
        {
            return new Dictionary<string, string> { { "Hello", "World" } };
        }
    }
}
