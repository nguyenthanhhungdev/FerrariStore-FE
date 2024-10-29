using System.ComponentModel.DataAnnotations;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using THebook.Common;
using THebook.Models.Entities;
using THebook.Models.Queries;
using THebook.Services;

#pragma warning disable IDE0130 // Namespace does not match folder structure
namespace THebook.Controllers.Tag
#pragma warning restore IDE0130 // Namespace does not match folder structure
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController(
        TagService tagService,
        IValidator<TagCriteria> tagValidator,
        IValidator<QueryObjectId> idValidator,
        ILogger<TagController> logger
    ) : ControllerBase
    {
        private readonly TagService _tagService = tagService;
        private readonly IValidator<QueryObjectId> _idValidator = idValidator;
        private readonly IValidator<TagCriteria> _tagValidator = tagValidator;
        private readonly ILogger<TagController> _logger = logger;

        [HttpGet]
        public async Task<IEnumerable<TagEntity>> Get([FromQuery] TagCriteria criteria)
        {
            await ValidationHelper.ValidateAndThrowAsync(_tagValidator, ModelState, criteria);
            return await _tagService.GetTagsAsync(criteria);
        }

        [HttpGet("{id}")]
        public async Task<TagEntity?> GetById([Required] string id)
        {
            await ValidationHelper.ValidateAndThrowAsync(
                _idValidator,
                ModelState,
                new QueryObjectId { Id = id }
            );
            return await _tagService.GetTagByIdAsync(id);
        }

        [HttpPost]
        public async Task<IActionResult> AddTag([FromBody] TagEntity tag)
        {
            if (tag == null)
            {
                return BadRequest("Tag cannot be null");
            }

            await _tagService.AddTagAsync(tag);
            return CreatedAtAction(nameof(GetById), new { id = tag.Id }, tag);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTag(string id, [FromBody] TagEntity tag)
        {
            if (tag == null)
            {
                return BadRequest("Tag cannot be null");
            }

            await _tagService.UpdateTagAsync(id, tag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(string id)
        {
            await _tagService.DeleteTagAsync(id);
            return NoContent();
        }
    }
}
