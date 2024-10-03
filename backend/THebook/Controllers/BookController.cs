using Microsoft.AspNetCore.Mvc;
using THebook.Models;
using THebook.Services;

namespace THebook.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController(BookService bookService) : Controller
{
    [HttpGet]
    public async Task<ActionResult<List<Book>>> Get() =>
        await bookService.GetAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> Get(string id)
    {
        var book = await bookService.GetAsync(id);
    
        return book;
    }
    
    [HttpPost]
    public async Task<ActionResult<Book>> Create(Book book)
    {
        await bookService.CreateAsync(book);
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Book bookIn)
    {
        var book = await bookService.GetAsync(id);
    
        await bookService.UpdateAsync(id, bookIn);
    
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var book = await bookService.GetAsync(id);
    
        await bookService.RemoveAsync(book);
    
        return NoContent();
    }
}