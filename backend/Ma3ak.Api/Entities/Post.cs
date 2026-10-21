namespace Ma3ak.Api.Entities
{
    public class Post
    {
        public int Id { get; set; }
        public int AuthorId { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public User Author { get; set; } = null!;
        public List<Comment> Comments { get; set; } = new();
        public List<Like> Likes { get; set; } = new();
        public List<PostAttachment> Attachments { get; set; } = new();
    }
}
