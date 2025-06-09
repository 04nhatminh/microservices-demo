using Microsoft.AspNetCore.Mvc;
using UserService.Data;
using UserService.Models;
using Microsoft.EntityFrameworkCore;

namespace UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (await _context.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest("Username already exists");

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok("Register success");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            Console.WriteLine("Received /login request");
            var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);
            if (dbUser == null)
                return Unauthorized("Invalid credentials");

            return Ok("Login success");
        }
    }
}