namespace Ma3ak.Api.Entities
{
    public class PostAttachment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string FileUrl { get; set; } = null!;
        public FileType Type { get; set; }

        public Post Post { get; set; } = null!;
    }
}
