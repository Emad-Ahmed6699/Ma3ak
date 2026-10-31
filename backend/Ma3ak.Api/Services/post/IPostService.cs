using Ma3ak.Api.DTOs;

namespace Ma3ak.Api.Services.post
{
    public interface IPostService
    {
        Task<List<PostResponseDto>> GetAllPostsAsync();
        Task<PostResponseDto> CreatePostAsync(PostCreateDto dto, int authorId);
        Task<bool> DeletePostAsync(int postId, int authorId);
        Task<bool> UpdatePostAsync(int postId, PostUpdateDto dto, int userId);
    }
}
