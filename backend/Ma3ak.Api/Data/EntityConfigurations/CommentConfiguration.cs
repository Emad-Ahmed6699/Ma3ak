using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ma3ak.Api.Entities;

namespace Ma3ak.Api.Configurations;

public class CommentConfiguration : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.Property(c => c.Content).IsRequired().HasMaxLength(1000);

        // ربط التعليق بصاحبه (نمنع الحذف التلقائي)
        builder.HasOne(c => c.Author)
               .WithMany()
               .HasForeignKey(c => c.AuthorId)
               .OnDelete(DeleteBehavior.Restrict);

        // ربط التعليق بالبوست (لو البوست اتمسح، التعليقات تتمسح معاه)
        builder.HasOne(c => c.Post)
               .WithMany(p => p.Comments)
               .HasForeignKey(c => c.PostId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.Property(c => c.CreatedAt)
               .HasDefaultValueSql("GETUTCDATE()");
    }
}