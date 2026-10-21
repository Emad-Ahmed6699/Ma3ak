using Ma3ak.Api.DTOs.Users;

namespace Ma3ak.Api.Services.Auth;

public interface IAuthService
{
    Task<UserReturnDto> RegisterAsync(UserRegisterDto userDto);
    Task<AuthResponseDto> LoginAsync(UserLoginDto loginDto);
}