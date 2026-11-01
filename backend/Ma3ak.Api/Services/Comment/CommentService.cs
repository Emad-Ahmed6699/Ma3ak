using Ma3ak.Api.Data;
using Ma3ak.Api.DTOs;
using Microsoft.EntityFrameworkCore;

namespace Ma3ak.Api.Services.Comment
{
    public class CommentService(ApplicationDbContext _context): ICommentService
    {
        public async Task<List<CommentResponseDto>> GetCommentsByPostIdAsync(int postId)
        {
            return await _context.Comments
                .Where(c => c.PostId == postId)
                .Include(c => c.Author)
                .Select(c => new CommentResponseDto
                {
                    Id = c.Id,
                    Content = c.Content,
                    CreatedAt = c.CreatedAt,
                    AuthorName = c.Author.FullName
                })
                .ToListAsync();
        }

        public async Task<CommentResponseDto?> AddCommentAsync(int postId, CommentCreateDto dto, int userId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) return null;

            var comment = new Ma3ak.Api.Entities.Comment
            {
                Content = dto.Content,
                PostId = postId,
                AuthorId = userId,
                CreatedAt = DateTime.UtcNow
            };

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            var author = await _context.Users.FindAsync(userId);

            return new CommentResponseDto
            {
                Id = comment.Id,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                AuthorName = author?.FullName ?? "Unknown"
            };
        }

        public async Task<bool> DeleteCommentAsync(int commentId, int userId)
        {
            var comment = await _context.Comments.FindAsync(commentId);

            // التحقق من وجود التعليق وأن المستخدم الحالي هو صاحبه
            if (comment == null || comment.AuthorId != userId)
                return false;

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
