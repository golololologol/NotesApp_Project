using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NotesAPI.Models.Entities;

namespace NotesAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Optional: Fluent API configuration for the Note entity
            builder.Entity<Note>(entity =>
            {
                entity.Property(n => n.Title)
                      .IsRequired()
                      .HasMaxLength(100);
                entity.Property(n => n.Description)
                      .HasMaxLength(1000);
                entity.Property(n => n.CreatedDate)
                      .IsRequired();
            });
        }
    }
}
