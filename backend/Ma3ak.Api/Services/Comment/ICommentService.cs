using Ma3ak.Api.DTOs;

namespace Ma3ak.Api.Services.Comment
{
    public interface ICommentService
    {
        Task<List<CommentResponseDto>> GetCommentsByPostIdAsync(int postId);
        Task<CommentResponseDto?> AddCommentAsync(int postId, CommentCreateDto dto, int userId);
        Task<bool> DeleteCommentAsync(int commentId, int userId);
    }
}
