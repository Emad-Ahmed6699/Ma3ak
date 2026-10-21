using BCrypt.Net;
using Ma3ak.Api.Data;
using Ma3ak.Api.DTOs.Users;
using Ma3ak.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens; // ضروري للتوكن
using System.IdentityModel.Tokens.Jwt; // ضروري للتوكن
using System.Security.Claims; // ضروري للتوكن
using System.Text; // ضروري للتوكن
namespace Ma3ak.Api.Services.Auth;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    public AuthService(ApplicationDbContext context,IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto)
    {
        // 1. ندور على اليوزر بالإيميل
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        // لو مش موجود أو الباسورد غلط (بنخليهم نفس الرسالة لأسباب أمنية عشان الهاكرز)
        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        {
            throw new Exception("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
        }

        // 2. نطبع الكارنيه (Token)
        string token = GenerateJwtToken(user);

        // 3. نرجع النتيجة
        return new AuthResponseDto
        {
            Token = token,
            User = new UserReturnDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Username = user.Username,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            }
        };
    }

    // دالة خاصة (Private) وظيفتها بس تطبع الـ Token
    private string GenerateJwtToken(User user)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // البيانات اللي هتتختم جوه التوكن (زي الـ ID والإيميل)
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.Username)
        };

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(double.Parse(jwtSettings["DurationInDays"]!)),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<UserReturnDto> RegisterAsync(UserRegisterDto userDto)
    {
        // 1. التأكد من عدم تكرار الإيميل أو اسم المستخدم
        if (await _context.Users.AnyAsync(u => u.Email == userDto.Email))
            throw new Exception("البريد الإلكتروني مسجل بالفعل.");

        if (await _context.Users.AnyAsync(u => u.Username == userDto.Username))
            throw new Exception("اسم المستخدم مأخوذ.");

        // 2. تشفير الباسورد
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password);

        // 3. تحويل الـ DTO إلى Entity
        var user = new User
        {
            FullName = userDto.FullName,
            Username = userDto.Username,
            Email = userDto.Email,
            PasswordHash = passwordHash,
            DisplayName = userDto.FullName
        };

        // 4. الحفظ في قاعدة البيانات
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // 5. إرجاع النتيجة للـ Frontend بدون الباسورد
        return new UserReturnDto
        {
            Id = user.Id,
            FullName = user.FullName,
            Username = user.Username,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };
    }
}