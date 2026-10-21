using Ma3ak.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Ma3ak.Api.Data.EntityConfigurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            // إعدادات الفهارس (القيم الفريدة)
            builder.HasIndex(u => u.Email).IsUnique();
            builder.HasIndex(u => u.Username).IsUnique();

            // إعدادات الخصائص (الأطوال والإلزام)
            builder.Property(u => u.Email).IsRequired().HasMaxLength(256);
            builder.Property(u => u.Username).IsRequired().HasMaxLength(50);
            builder.Property(u => u.PasswordHash).IsRequired();
            builder.Property(u => u.DisplayName).IsRequired().HasMaxLength(100);
            builder.Property(u => u.Bio).HasMaxLength(500);
            builder.Property(u => u.AvatarUrl).HasMaxLength(1000);

            // تحويل الـ Enum إلى نصوص في قاعدة البيانات
            builder.Property(u => u.Role)
                   .HasConversion<string>()
                   .HasMaxLength(20);

            // جعل تاريخ الإنشاء يأخذ الوقت الحالي افتراضياً من قاعدة البيانات
            builder.Property(u => u.CreatedAt)
                   .HasDefaultValueSql("GETUTCDATE()");
        }

        
    }
}
