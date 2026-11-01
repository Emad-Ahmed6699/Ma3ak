using Ma3ak.Api.Data;
using Ma3ak.Api.Entities;
using Microsoft.EntityFrameworkCore;
using System;

namespace Ma3ak.Api.Services.Likes
{
    public class LikeService : ILikeService
    {
        private readonly ApplicationDbContext _context;

        public LikeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ToggleLikeAsync(int postId, int userId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null) throw new Exception("البوست غير موجود.");

            // البحث باستخدام الـ PostId والـ UserId معاً
            var existingLike = await _context.Likes
                .FirstOrDefaultAsync(l => l.PostId == postId && l.UserId == userId);

            if (existingLike != null)
            {
                // الإعجاب موجود -> إذن دي عملية Unlike (إلغاء الإعجاب)
                _context.Likes.Remove(existingLike);
                await _context.SaveChangesAsync();
                return false;
            }
            else
            {
                // الإعجاب مش موجود -> إذن دي عملية Like جديدة
                var like = new Like
                {
                    PostId = postId,
                    UserId = userId,
                    CreatedAt = DateTime.UtcNow
                };
                _context.Likes.Add(like);
                await _context.SaveChangesAsync();
                return true;
            }
        }

        public async Task<int> GetLikesCountAsync(int postId)
        {
            return await _context.Likes.CountAsync(l => l.PostId == postId);
        }
    }
}
