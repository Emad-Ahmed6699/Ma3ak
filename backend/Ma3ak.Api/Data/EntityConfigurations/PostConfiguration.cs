using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ma3ak.Api.Entities;

namespace Ma3ak.Api.Configurations;

public class PostConfiguration : IEntityTypeConfiguration<Post>
{
    public void Configure(EntityTypeBuilder<Post> builder)
    {
        builder.Property(p => p.Content).IsRequired().HasMaxLength(2000);

        // ربط المنشور بصاحبه ومنع الحذف التلقائي لتجنب تعارض المسارات
        builder.HasOne(p => p.Author)
               .WithMany(u => u.Posts)
               .HasForeignKey(p => p.AuthorId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.Property(p => p.CreatedAt)
               .HasDefaultValueSql("GETUTCDATE()");
    }
}