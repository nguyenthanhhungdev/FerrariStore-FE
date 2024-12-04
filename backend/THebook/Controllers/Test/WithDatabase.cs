using Microsoft.AspNetCore.Mvc;
using THebook.Models.Entities;
using THebook.Models.Tests;
using THebook.Services;
using THebook.Services.Tests;

namespace THebook.Controllers.Test
{
    [ApiController]
    [Route("test/db")]
    public class WithDatabase(FooBarService fooBarService, BookTestService bookTestService)
        : ControllerBase
    {
        private readonly FooBarService _fooBarService = fooBarService;
        private readonly BookTestService _bookTestService = bookTestService;

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

        [HttpGet("testbooks")]
        public async Task<IEnumerable<BookTest>> GetBooksTest()
        {
            return await _bookTestService.GetAsync();
        }

        [HttpGet("testbooks/names")]
        public async Task<IEnumerable<string?>> GetBookNamesTest()
        {
            return await _bookTestService.GetNameAsync();
        }

        [HttpPost("testbooks")]
        public async Task<IActionResult> AddBookTest([FromBody] BookTest book)
        {
            book.Id = null;
            await _bookTestService.AddAsync(book);
            return CreatedAtAction(nameof(GetBooksTest), new { id = book.Id }, book);
        }

        [HttpPut("testbooks/{id}")]
        public async Task<IActionResult> UpdateBook(string id, [FromBody] BookTest book)
        {
            book.Id = null;
            await _bookTestService.UpdateAsync(id, book);
            return NoContent();
        }

        [HttpDelete("testbooks/{id}")]
        public async Task<IActionResult> DeleteBook(string id)
        {
            await _bookTestService.RemoveAsync(id);
            return NoContent();
        }
    }
}
