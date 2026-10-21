namespace Ma3ak.Api.DTOs.Users;

public class UserReturnDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ProfilePictureUrl { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}