using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using THebook.ExceptionError;
using THebook.Models;
using THebook.Services;

namespace THebook.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookController(BookService bookService) : Controller
{
    [HttpGet]
    public async Task<ActionResult<List<Book>>> Get()
    {
        Console.WriteLine("P::Get all books");
        return await bookService.GetAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Book>> Get(string id)
    {
        Console.WriteLine("P::Get book");
        var book = await bookService.GetAsync(id);
        if (book == null)
        {
            throw new BookNotFoundException(id);
        }
        return book;
    }

    [HttpPost]
    public async Task<ActionResult<Book>> Create(Book book)
    {
        Console.WriteLine("P::Create book");
        try
        {
            await bookService.CreateAsync(book);
        } catch (MongoWriteException e)
        {
            throw new BookAlreadyExitsException(book.Id);
        }
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Book bookIn)
    {
        Console.WriteLine("P::Update book");
        try
        {
            await bookService.UpdateAsync(id, bookIn);
        } catch (MongoWriteException e)
        {
            throw new BookNotFoundException(id);
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        Console.WriteLine("P::Delete book");
        try
        {
            await bookService.RemoveAsync(id);
        } catch (MongoWriteException e)
        {
            throw new BookNotFoundException(id);
        }
        return NoContent();
    }
}