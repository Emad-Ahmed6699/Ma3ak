using Ma3ak.Api.DTOs.Users;
using Ma3ak.Api.Services.Auth;
using Microsoft.AspNetCore.Mvc;

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
}