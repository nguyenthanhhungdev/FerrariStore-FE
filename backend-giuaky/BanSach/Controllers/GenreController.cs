using BanSach.Models;
using BanSach.Services;
using Microsoft.AspNetCore.Mvc;

namespace BanSach.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenreController(GenreService genreService) : ControllerBase
    {
        private readonly GenreService _genreService = genreService;

        [HttpGet]
        public async Task<IEnumerable<Genre>> GetAsync()
        {
            return await _genreService.GetAsync();
        }

        [HttpGet("{query}")]
        public async Task<Genre?> GetOneAsync(string query)
        {
            return await _genreService.GetByIdAsync(query)
                ?? await _genreService.GetByNameAsync(query);
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsync([FromBody] Genre genre)
        {
            var result = await _genreService.AddAsync(genre);
            // return CreatedAtAction(nameof(GetOneAsync), new { query = genre.Id }, genre);
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsync(string id, [FromBody] Genre genre)
        {
            await _genreService.UpdateAsync(id, genre);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            await _genreService.DeleteAsync(id);
            return NoContent();
        }
    }
}
