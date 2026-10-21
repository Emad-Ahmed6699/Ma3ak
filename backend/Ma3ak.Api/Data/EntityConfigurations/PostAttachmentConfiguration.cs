using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Ma3ak.Api.Entities;

namespace Ma3ak.Api.Configurations;

public class PostAttachmentConfiguration : IEntityTypeConfiguration<PostAttachment>
{
    public void Configure(EntityTypeBuilder<PostAttachment> builder)
    {
        builder.Property(pa => pa.FileUrl).IsRequired().HasMaxLength(1000);

        // تحويل نوع الملف من Enum لنص
        builder.Property(pa => pa.Type)
               .HasConversion<string>()
               .HasMaxLength(20);

        // لو البوست اتمسح، الصور والمرفقات تتمسح من الداتا بيز
        builder.HasOne(pa => pa.Post)
               .WithMany(p => p.Attachments)
               .HasForeignKey(pa => pa.PostId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}