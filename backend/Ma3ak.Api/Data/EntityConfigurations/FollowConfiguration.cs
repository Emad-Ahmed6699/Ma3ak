using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ma3ak.Api.Entities;

namespace Ma3ak.Api.Configurations;

public class FollowConfiguration : IEntityTypeConfiguration<Follow>
{
    public void Configure(EntityTypeBuilder<Follow> builder)
    {
        // 1. تحديد المفتاح الأساسي المركب (لمنع اليوزر من متابعة نفس الشخص مرتين)
        builder.HasKey(f => new { f.FollowerId, f.FolloweeId });

        // 2. إعداد علاقة "الشخص الذي يتابع" (Follower)
        builder.HasOne(f => f.Follower)
               .WithMany(u => u.Following)
               .HasForeignKey(f => f.FollowerId)
               .OnDelete(DeleteBehavior.Restrict); // Restrict لمنع تعارض الحذف

        // 3. إعداد علاقة "الشخص المُتابَع" (Followee)
        builder.HasOne(f => f.Followee)
               .WithMany(u => u.Followers)
               .HasForeignKey(f => f.FolloweeId)
               .OnDelete(DeleteBehavior.Restrict); // Restrict لمنع تعارض الحذف

        // 4. تعيين الوقت الافتراضي
        builder.Property(f => f.CreatedAt)
               .HasDefaultValueSql("GETUTCDATE()");
    }
}