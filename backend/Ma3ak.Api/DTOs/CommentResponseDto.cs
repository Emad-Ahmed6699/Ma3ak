namespace Ma3ak.Api.DTOs
{
    public class CommentResponseDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public string AuthorName { get; set; } = null!; // اسم صاحب التعليق
    }
}
