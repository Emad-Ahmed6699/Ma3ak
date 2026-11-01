namespace Ma3ak.Api.Services.Likes
{
    public interface ILikeService
    {
        Task<bool> ToggleLikeAsync(int postId, int userId); // ترجع True لو بقى معجب، أو False لو لغا الإعجاب
        Task<int> GetLikesCountAsync(int postId);
    }
}
