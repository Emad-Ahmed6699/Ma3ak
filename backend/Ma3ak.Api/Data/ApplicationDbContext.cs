using Ma3ak.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Ma3ak.Api.Data
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }
        public DbSet<User> Users => Set<User>();
        public DbSet<Post> Posts => Set<Post>();
        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Like> Likes => Set<Like>();
        public DbSet<Follow> Follows => Set<Follow>();
        public DbSet<Report> Reports => Set<Report>();
        public DbSet<PostAttachment> PostAttachments => Set<PostAttachment>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // 2. هذا السطر يقوم بالبحث في المشروع بالكامل عن أي كلاس يطبق IEntityTypeConfiguration
            // ويقوم بتنفيذ الإعدادات الموجودة بداخله أوتوماتيكياً
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
    
    
}

