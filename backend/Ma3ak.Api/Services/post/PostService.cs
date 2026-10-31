using Ma3ak.Api.Data;
using Ma3ak.Api.DTOs;
using Ma3ak.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Ma3ak.Api.Services.post
{
    public class PostService(ApplicationDbContext _context) : IPostService
    {
        public async Task<PostResponseDto> CreatePostAsync(PostCreateDto dto, int authorId)
        {
            var post = new Post
            {
                Title = dto.Title,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow,
                AuthorId = authorId
            };
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            var author = await _context.Users.FindAsync(authorId);
            return new PostResponseDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                AuthorName = author?.FullName ?? "Unknown" // This should be replaced with the actual author's name based on authorId
            };
        }

        public async Task<List<PostResponseDto>> GetAllPostsAsync()
        {
            var posts = await _context.Posts.Include(p => p.Author).ToListAsync();
            return posts.Select(post => new PostResponseDto
            {
                Id = post.Id,
                Title = post.Title,
                Content = post.Content,
                CreatedAt = post.CreatedAt,
                AuthorName = post.Author?.FullName ?? "Unknown"
            }).ToList();
        }
        public async Task<bool> DeletePostAsync(int postId, int authorId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null || post.AuthorId != authorId)
            {
                return false; // Post not found or user is not the author
            }
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return true;

        }
        public async Task<bool> UpdatePostAsync(int postId, PostUpdateDto dto, int userId)
        {
            var post = await _context.Posts.FindAsync(postId);

            // التأكد إن البوست موجود وإن اليوزر الحالي هو صاحب البوست فعلاً
            if (post == null || post.AuthorId != userId)
                return false;

            post.Title = dto.Title;
            post.Content = dto.Content;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
