using Microsoft.Extensions.Hosting;

namespace Ma3ak.Api.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string? Bio { get; set; }
        public string? AvatarUrl { get; set; }
        public UserRole Role { get; set; } = UserRole.User;
        public bool IsBanned { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public List<Post> Posts { get; set; } = new();
        public List<Follow> Followers { get; set; } = new();  // اللي بيتابعوني
        public List<Follow> Following { get; set; } = new();  // اللي أنا بتابعهم
    }
}
