using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ma3ak.Api.Entities;

namespace Ma3ak.Api.Configurations;

public class ReportConfiguration : IEntityTypeConfiguration<Report>
{
    public void Configure(EntityTypeBuilder<Report> builder)
    {
        builder.Property(r => r.Notes).HasMaxLength(1000);

        // تحويل الـ Enums لنصوص
        builder.Property(r => r.Reason).HasConversion<string>().HasMaxLength(30);
        builder.Property(r => r.Status).HasConversion<string>().HasMaxLength(20);

        // المُبلِّغ (لا يمكن حذفه تلقائياً إذا تم حذف اليوزر)
        builder.HasOne(r => r.Reporter)
               .WithMany()
               .HasForeignKey(r => r.ReporterId)
               .OnDelete(DeleteBehavior.Restrict);

        // المشرف الذي حل البلاغ (إذا تم حذف المشرف، نجعل الحقل Null ولا نحذف البلاغ)
        builder.HasOne(r => r.ResolvedBy)
               .WithMany()
               .HasForeignKey(r => r.ResolvedById)
               .OnDelete(DeleteBehavior.SetNull);

        builder.Property(r => r.CreatedAt)
               .HasDefaultValueSql("GETUTCDATE()");
    }
}