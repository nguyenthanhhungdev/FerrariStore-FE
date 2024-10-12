using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using THebook.Models;
using THebook.Services;

namespace THebook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly MongoDBService _mongoDBService;

        public UserController(MongoDBService mongoDBService)
        {
            _mongoDBService = mongoDBService;
        }

        // [HttpGet]
        // public async Task<List<User>> Get()
        // {
        //     return await _mongoDBService.GetAsync();
        // }
    }
}
