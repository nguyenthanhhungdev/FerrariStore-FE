using System.ComponentModel.DataAnnotations;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using THebook.Infrastructure;
using THebook.Models.Entities;
using THebook.Models.Queries;
using THebook.Services;

namespace THebook.Controllers
{
    [ApiController]
    // [AutoValidation]
    [Route("api/[controller]")]
    public class CategoryController(
        CategoryService categoryService,
        IValidator<CategoryRequestCriteria> categoryCriteriaValidator,
        IValidator<string> idValidator,
        IValidator<CategoryRequest> categoryDtoValidator,
        ILogger<CategoryController> logger
    ) : ControllerBase
    {
        private readonly CategoryService _categoryService = categoryService;
        private readonly IValidator<string> _idValidator = idValidator;
        private readonly IValidator<CategoryRequestCriteria> _categoryCriteriaValidator =
            categoryCriteriaValidator;
        private readonly IValidator<CategoryRequest> _categoryDtoValidator = categoryDtoValidator;
        private readonly ILogger<CategoryController> _logger = logger;

        [HttpGet]
        public async Task<IEnumerable<Category>> Get([FromQuery] CategoryRequestCriteria criteria)
        {
            await this.ValidateAndThrowAsync(_categoryCriteriaValidator, criteria);
            return await _categoryService.GetAsync(criteria);
        }

        [HttpGet("{id}")]
        public async Task<Category?> GetById([Required] string id)
        {
            await this.ValidateAndThrowAsync(_idValidator, id);
            return await _categoryService.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> AddTag([FromBody] CategoryRequest category)
        {
            await this.ValidateAndThrowAsync(_categoryDtoValidator, category);
            await _categoryService.AddAsync(category);
            return Created();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTag(string id, [FromBody] CategoryRequest category)
        {
            await this.ValidateAndThrowAsync(_categoryDtoValidator, category);
            await _categoryService.UpdateAsync(id, category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(string id)
        {
            await _categoryService.DeleteAsync(id);
            return NoContent();
        }
    }
}
