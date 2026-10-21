using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ma3ak.Api.Entities;

namespace Ma3ak.Api.Configurations;

public class LikeConfiguration : IEntityTypeConfiguration<Like>
{
    public void Configure(EntityTypeBuilder<Like> builder)
    {
        // مفتاح مركب لمنع اليوزر من عمل لايك لنفس البوست مرتين
        builder.HasKey(l => new { l.PostId, l.UserId });

        builder.HasOne(l => l.User)
               .WithMany()
               .HasForeignKey(l => l.UserId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(l => l.Post)
               .WithMany(p => p.Likes)
               .HasForeignKey(l => l.PostId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.Property(l => l.CreatedAt)
               .HasDefaultValueSql("GETUTCDATE()");
    }
}