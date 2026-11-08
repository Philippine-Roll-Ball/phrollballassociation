
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ==========================================
        // DBSETS
        // ==========================================

        public DbSet<User> Users { get; set; }
        public DbSet<Admin> Admins { get; set; }

        public DbSet<Match> Matches { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<TournamentTeam> TournamentTeams { get; set; }
        public DbSet<MatchTeam> MatchTeams { get; set; }
        public DbSet<QrCode> Qrcodes { get; set; }
        public DbSet<News> News { get; set; }

        // ==========================================
        // MODEL CONFIGURATION
        // ==========================================

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ======================================
            // ADMIN
            // ======================================

            modelBuilder.Entity<Admin>()
                .HasIndex(a => a.Email)
                .IsUnique();

            // ======================================
            // USER INHERITANCE (TPH)
            // ======================================

            modelBuilder.Entity<User>()
                .HasDiscriminator(u => u.Role)
                .HasValue<Player>("Player")
                .HasValue<Coach>("Coach")
                .HasValue<Admin>("Admin");

            // ======================================
            // TOURNAMENT TEAM
            // ======================================

            modelBuilder.Entity<TournamentTeam>()
                .HasKey(tt => new
                {
                    tt.TournamentID,
                    tt.TeamID
                });

            modelBuilder.Entity<TournamentTeam>()
                .HasOne(tt => tt.Team)
                .WithMany(t => t.TournamentTeams)
                .HasForeignKey(tt => tt.TeamID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<TournamentTeam>()
                .HasOne(tt => tt.Tournament)
                .WithMany(t => t.TournamentTeams)
                .HasForeignKey(tt => tt.TournamentID)
                .OnDelete(DeleteBehavior.Cascade);

            // ======================================
            // MATCH TEAM
            // ======================================

            modelBuilder.Entity<MatchTeam>()
                .HasKey(mt => new
                {
                    mt.MatchID,
                    mt.TeamID
                });

            modelBuilder.Entity<MatchTeam>()
                .HasOne(mt => mt.Team)
                .WithMany(t => t.MatchTeams)
                .HasForeignKey(mt => mt.TeamID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MatchTeam>()
                .HasOne(mt => mt.Match)
                .WithMany(m => m.MatchTeams)
                .HasForeignKey(mt => mt.MatchID)
                .OnDelete(DeleteBehavior.Cascade);

            // ======================================
            // COACH - TEAM RELATIONSHIP
            // ======================================

            modelBuilder.Entity<Coach>()
                .HasOne(c => c.TeamAssigned)
                .WithOne(t => t.CoachAssigned)
                .HasForeignKey<Coach>(c => c.TeamID)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // ======================================
            // PLAYER - TEAM RELATIONSHIP
            // ======================================

            modelBuilder.Entity<Player>()
                .HasOne(p => p.TeamAssigned)
                .WithMany(t => t.Players)
                .HasForeignKey(p => p.TeamID)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // ======================================
            // OTHER SPORTS CONVERSION
            // ======================================

            modelBuilder.Entity<User>()
                .Property(u => u.OtherSports)
                .HasConversion(
                    v => string.Join(",", v ?? new List<string?>()),
                    v => string.IsNullOrEmpty(v)
                        ? new List<string?>()
                        : v.Split(
                            ',',
                            StringSplitOptions.RemoveEmptyEntries
                        )
                        .Select(s => (string?)s)
                        .ToList()
                );

            // ======================================
            // NEWS
            // ======================================

            modelBuilder.Entity<News>(entity =>
            {
                entity.HasKey(n => n.Id);

                entity.Property(n => n.Headline)
                    .IsRequired()
                    .HasMaxLength(128);

                entity.Property(n => n.Body)
                    .IsRequired()
                    .HasMaxLength(9999);

                // PostgreSQL UTC timestamp
                entity.Property(n => n.CreatedAt)
                    .IsRequired()
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(n => n.UpdatedAt)
                    .IsRequired()
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
        }
    }
}
