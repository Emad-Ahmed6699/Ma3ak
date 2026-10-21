namespace Ma3ak.Api.Entities
{
    public class Like
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Post Post { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}
