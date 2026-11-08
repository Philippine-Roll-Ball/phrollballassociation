
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace server.Services
{
    public class AuthenticationService
    {
        private readonly IConfiguration _configuration;

        public AuthenticationService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // Hash password before saving it to the database
        public string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        // Verify entered password against stored password hash
        public bool VerifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }

        // Generate JWT after successful registration or login
        public string IssueJwt(string? uid, string? email, string? role)
        {
            if (string.IsNullOrWhiteSpace(uid) ||
                string.IsNullOrWhiteSpace(email) ||
                string.IsNullOrWhiteSpace(role))
            {
                throw new ArgumentException(
                    "User ID, email, and role are required to generate a JWT."
                );
            }

            var jwtKey = _configuration["Jwt:Key"];
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            if (string.IsNullOrWhiteSpace(jwtKey))
                throw new InvalidOperationException("JWT Key is missing.");

            if (string.IsNullOrWhiteSpace(issuer))
                throw new InvalidOperationException("JWT Issuer is missing.");

            if (string.IsNullOrWhiteSpace(audience))
                throw new InvalidOperationException("JWT Audience is missing.");

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, uid),
                new Claim(JwtRegisteredClaimNames.Email, email),
                new Claim(ClaimTypes.Role, role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            );

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
