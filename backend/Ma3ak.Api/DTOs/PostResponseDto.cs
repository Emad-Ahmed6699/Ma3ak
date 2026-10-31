namespace Ma3ak.Api.DTOs
{
    public class PostResponseDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string AuthorName { get; set; } = null!; // اسم صاحب البوست
    }
}
