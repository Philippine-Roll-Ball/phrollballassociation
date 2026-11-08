
using System.ComponentModel.DataAnnotations;

namespace server.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(50)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8)]
        [MaxLength(100)]
        public string Password { get; set; } = string.Empty;

        [Required]
        [MaxLength(11)]
        public string ContactNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string MiddleName { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; } = string.Empty;

        [MaxLength(5)]
        public string? Suffix { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        [MaxLength(100)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [MaxLength(6)]
        public string Sex { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string EducationalAttainment { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? ProfileImageUrl { get; set; }

        [Required]
        [MaxLength(15)]
        public string Nationality { get; set; } = string.Empty;

        [Required]
        [MaxLength(30)]
        public string Occupation { get; set; } = string.Empty;

        public List<string?>? OtherSports { get; set; } = new();
    }
}
