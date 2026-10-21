namespace Ma3ak.Api.Entities
{
    public class Report
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int ReporterId { get; set; }
        public ReportReason Reason { get; set; }
        public string? Notes { get; set; }
        public ReportStatus Status { get; set; } = ReportStatus.Pending;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public int? ResolvedById { get; set; }
        public DateTime? ResolvedAt { get; set; }

        public Post Post { get; set; } = null!;
        public User Reporter { get; set; } = null!;
        public User? ResolvedBy { get; set; }
    }
}
