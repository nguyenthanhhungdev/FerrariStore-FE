using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using THebook.Models;
using THebook.Services;

namespace THebook.Controllers.Book
{
    [Route("book/[controller]")]
    [ApiController]
    public class BookController(BookService bookService, ILogger<BookController> logger) : Controller
    {
        [HttpGet]
        public async Task<ActionResult<List<BookDb>>> Get()
        {
            logger.LogInformation("Getting all books");
            return await bookService.GetAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDb>> Get(string id)
        {
            logger.LogInformation("Getting book with id {Id}", id);
            var book = await bookService.GetAsync(id);
            if (book == null)
            {
                return NotFound( new { message = $"Book with id {id} not found" });
            }
            return book;
        }

        [HttpPost]
        public async Task<ActionResult<BookDb>> Create(BookDb book)
        {
            logger.LogInformation("Creating a new book");
            try
            {
                await bookService.CreateAsync(book);
            }
            catch (MongoWriteException e)
            {
                throw new Exception($"Error creating book with id {book.Id}: {e.WriteError.Code}");
            }
            return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, BookDb bookIn)
        {
            logger.LogInformation("Updating book with id {Id}", id);
            try
            {
                var book = await bookService.GetAsync(id);
                if (book == null)
                {
                    return NotFound( new { message = $"Book with id {id} not found" });
                }
                await bookService.UpdateAsync(id, bookIn);
            }
            catch (MongoWriteException e)
            {
                throw new Exception($"Error updating book with id {id}: {e.WriteError.Code}");
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            
            logger.LogInformation("Deleting book with id {Id}", id);
            try
            {
                var book = await bookService.GetAsync(id);
                if (book == null)
                {
                    return NotFound( new { message = $"Book with id {id} not found" });
                }
                await bookService.RemoveAsync(id);
            }
            catch (MongoWriteException e)
            {
                throw new Exception($"Error deleting book with id {id}: {e.WriteError.Code}");
            }
            return Ok();
        }
    }
}