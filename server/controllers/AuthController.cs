
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using server.Data;
using server.Models;
using server.Services;
using server.DTOs;

namespace server.controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly AuthenticationService _authService;

        public AuthController(
            AppDbContext context,
            AuthenticationService authService)
        {
            _context = context;
            _authService = authService;
        }

        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register(
            [FromBody] RegisterDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var normalizedEmail = request.Email.Trim().ToLower();

            // Check duplicate email
            var existingUser = await _context.Users
                .AnyAsync(u =>
                    u.Email != null &&
                    u.Email.ToLower() == normalizedEmail
                );

            if (existingUser)
            {
                return Conflict(new
                {
                    message = "Email is already registered."
                });
            }

            // Generate user ID
            var user = new Player
            {
                UserID = Guid.NewGuid().ToString(),
                Email = normalizedEmail,

                // Hash password before saving
                PasswordHash = _authService.HashPassword(request.Password),

                ContactNumber = request.ContactNumber,
                FirstName = request.FirstName,
                MiddleName = request.MiddleName,
                LastName = request.LastName,
                Suffix = request.Suffix,
                BirthDate = request.BirthDate,
                Address = request.Address,
                Sex = request.Sex,
                EducationalAttainment = request.EducationalAttainment,
                ProfileImageUrl = request.ProfileImageUrl,
                Nationality = request.Nationality,
                Occupation = request.Occupation,
                OtherSports = request.OtherSports ?? new List<string?>(),

                // Public registration is Player only
                Role = "Player",

                DateRegistered = DateTime.UtcNow
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            // Generate JWT after successful registration
            var token = _authService.IssueJwt(
                user.UserID,
                user.Email,
                user.Role
            );

            return Created("", new
            {
                message = "Registration successful.",
                token,
                user = new
                {
                    user.UserID,
                    user.Email,
                    user.FirstName,
                    user.MiddleName,
                    user.LastName,
                    user.Role,
                    user.ProfileImageUrl
                }
            });
        }

        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login(
            [FromBody] LoginDto request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var normalizedEmail = request.Email.Trim().ToLower();

            var user = await _context.Users
                .FirstOrDefaultAsync(u =>
                    u.Email != null &&
                    u.Email.ToLower() == normalizedEmail
                );

            if (user == null)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            bool isPasswordValid = _authService.VerifyPassword(
                request.Password,
                user.PasswordHash
            );

            if (!isPasswordValid)
            {
                return Unauthorized(new
                {
                    message = "Invalid email or password."
                });
            }

            var jwtToken = _authService.IssueJwt(
                user.UserID,
                user.Email,
                user.Role
            );

            return Ok(new
            {
                message = "Login successful",
                token = jwtToken,
                user = new
                {
                    user.UserID,
                    user.Email,
                    user.FirstName,
                    user.MiddleName,
                    user.LastName,
                    user.Role,
                    user.ProfileImageUrl
                }
            });
        }
    }
}
