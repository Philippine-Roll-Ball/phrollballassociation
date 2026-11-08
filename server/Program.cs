
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

// ==========================================
// DATABASE: NEON POSTGRESQL
// ==========================================

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "Database connection string is missing. Configure ConnectionStrings:DefaultConnection."
    );
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        connectionString,
        npgsqlOptions =>
        {
            npgsqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(10),
                errorCodesToAdd: null
            );
        }
    )
);

// ==========================================
// RATE LIMITER
// ==========================================

builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("HealthCheckLimit", opt =>
    {
        opt.PermitLimit = 5;
        opt.Window = TimeSpan.FromMinutes(1);
        opt.QueueLimit = 0;
    });

    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
});

// ==========================================
// JWT AUTHENTICATION
// ==========================================

var jwtKey = builder.Configuration["Jwt:Key"];
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new InvalidOperationException("JWT signing key is missing.");
}

if (string.IsNullOrWhiteSpace(jwtIssuer) ||
    string.IsNullOrWhiteSpace(jwtAudience))
{
    throw new InvalidOperationException("JWT issuer or audience is missing.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            ),

            ValidateIssuer = true,
            ValidIssuer = jwtIssuer,

            ValidateAudience = true,
            ValidAudience = jwtAudience,

            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(1),

            RoleClaimType = ClaimTypes.Role
        };
    });

builder.Services.AddAuthorization();

// ==========================================
// APPLICATION SERVICES
// ==========================================

builder.Services.AddScoped<AuthenticationService>();

// ==========================================
// SWAGGER
// ==========================================

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==========================================
// CORS
// ==========================================

builder.Services.AddCors(options =>
{
    options.AddPolicy("PrbfPolicy", policy =>
    {
        policy.WithOrigins(
            "http://localhost:8080",
            "http://localhost:5173",
            "https://phrollball.vercel.app",
            "https://phrollballassociation-liart.vercel.app",
            "https://phrollballassociation-liart.vercel.app/"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
    });
});

// ==========================================
// CONTROLLERS
// ==========================================

builder.Services.AddControllers();

// ==========================================
// BUILD APPLICATION
// ==========================================

var app = builder.Build();

// ==========================================
// MIDDLEWARE
// ==========================================

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("PrbfPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.UseRateLimiter();

// ==========================================
// API ROUTES
// ==========================================

app.MapControllers();

app.MapGet("/health", (HttpRequest request, IConfiguration configuration) =>
{
    var secret = configuration["PING_SECRET"];
    var header = request.Headers["X-Ping-Secret"].FirstOrDefault();

    if (string.IsNullOrWhiteSpace(secret) || header != secret)
    {
        return Results.Unauthorized();
    }

    return Results.Ok(new
    {
        status = "Healthy",
        timestamp = DateTime.UtcNow
    });

}).RequireRateLimiting("HealthCheckLimit");

// ==========================================
// RUN
// ==========================================

app.Run();
