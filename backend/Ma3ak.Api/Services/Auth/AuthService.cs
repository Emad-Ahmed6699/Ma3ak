using BCrypt.Net;
using Ma3ak.Api.Data;
using Ma3ak.Api.DTOs.Users;
using Ma3ak.Api.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens; 
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims; 
using System.Text; 
using Microsoft.Extensions.Options; 
using Ma3ak.Api.Settings;
namespace Ma3ak.Api.Services.Auth;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly JwtSettings _jwtSettings;
    public AuthService(ApplicationDbContext context, IOptions<JwtSettings> jwtSettings)
    {
        _context = context;
        _jwtSettings = jwtSettings.Value;
    }

    public async Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
            throw new Exception("البريد الإلكتروني أو كلمة المرور غير صحيحة.");

        // توليد التوكنز
        string token = GenerateJwtToken(user);
        string refreshToken = GenerateRefreshToken();

        // حفظ الريفريش توكن في الداتا بيز لمدة 7 أيام
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            Token = token,
            RefreshToken = refreshToken,
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

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // البيانات اللي هتتختم جوه التوكن (زي الـ ID والإيميل)
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name, user.Username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var token = new JwtSecurityToken(
             issuer: _jwtSettings.Issuer,
             audience: _jwtSettings.Audience,
             claims: claims,
             expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
             signingCredentials: creds
          );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = System.Security.Cryptography.RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
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
    public async Task<AuthResponseDto> RefreshTokenAsync(TokenRequestDto requestDto)
    {
        // ندور على اليوزر اللي معاه الريفريش توكن ده
        var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == requestDto.RefreshToken);

        // لو مش موجود أو التوكن وقته خلص (عدى الـ 7 أيام)
        if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
        {
            throw new Exception("انتهت الجلسة، يرجى تسجيل الدخول مرة أخرى.");
        }

        // لو سليم، نولدله توكنز جديدة
        string newToken = GenerateJwtToken(user);
        string newRefreshToken = GenerateRefreshToken();

        // نحدث الداتا بيز
        user.RefreshToken = newRefreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _context.SaveChangesAsync();

        return new AuthResponseDto
        {
            Token = newToken,
            RefreshToken = newRefreshToken,
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
}