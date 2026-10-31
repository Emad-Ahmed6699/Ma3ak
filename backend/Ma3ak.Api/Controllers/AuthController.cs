using Ma3ak.Api.DTOs;
using Ma3ak.Api.DTOs.Users;
using Ma3ak.Api.Services.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Ma3ak.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
    {
        try
        {
            // استدعاء الخدمة اللي بتعمل Validation وتشفير وحفظ
            var result = await _authService.RegisterAsync(userDto);

            // إرجاع 200 OK مع بيانات المستخدم (بدون الباسورد)
            return Ok(result);
        }
        catch (Exception ex)
        {
            // لو الإيميل متسجل أو فيه أي مشكلة، بنرجع 400 Bad Request
            return BadRequest(new { message = ex.Message });
        }
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto loginDto)
    {
        try
        {
            var result = await _authService.LoginAsync(loginDto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message }); // 401 Unauthorized
        }
    }
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] TokenRequestDto requestDto)
    {
        try
        {
            var result = await _authService.RefreshTokenAsync(requestDto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }
    [HttpPost("revoke")]
    public async Task<IActionResult> Revoke([FromBody] RevokeTokenDto request)
    {
        var result = await _authService.RevokeTokenAsync(request.RefreshToken);

        if (!result)
            return BadRequest(new { message = "التوكن غير صالح أو تم تسجيل الخروج مسبقاً." });

        return Ok(new { message = "تم تسجيل الخروج بنجاح وتم إبطال الجلسة." });
    }
    [Authorize] // إجباري يكون مسجل دخول ومعاه توكن سليم
    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        // استخراج الـ ID من التوكن (الـ Claims اللي عملناها وقت إنشاء التوكن)
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (!int.TryParse(userIdString, out int userId))
            return Unauthorized(new { message = "توكن غير صالح." });

        var user = await _authService.GetMeAsync(userId);

        if (user == null)
            return NotFound(new { message = "المستخدم غير موجود." });

        return Ok(user);
    }
}