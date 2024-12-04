using Microsoft.AspNetCore.Mvc;
using THebook.Models.Entities;
using THebook.Services;

namespace THebook.Controllers.Test
{
    [ApiController]
    [Route("test/db")]
    public class WithDatabase(FooBarService fooBarService) : ControllerBase
    {
        private readonly FooBarService _fooBarService = fooBarService;

        [HttpGet]
        [Route("tag")]
        [Route("tags")]
        public IDictionary<string, string> GetTags()
        {
            return new Dictionary<string, string> { { "Hello", "World" } };
        }

        [HttpGet]
        [Route("foobar")]
        public Task<FooBar> GetFoobarTest()
        {
            return _fooBarService.Get();
        }

        [HttpPut]
        [Route("foobar")]
        public async Task PutFooBarTest(string barName, string fooName, bool error = false)
        {
            if (error)
                await _fooBarService.CreateOneLevelNestError(barName, fooName);
            else
                await _fooBarService.CreateOneLevelNestOk(barName, fooName);
        }
    }
}
