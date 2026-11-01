using Ma3ak.Api.Services.Likes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[Route("api/posts/{postId}/likes")]
[ApiController]
[Authorize]
public class LikesController : ControllerBase
{
    private readonly ILikeService _likeService;

    public LikesController(ILikeService likeService)
    {
        _likeService = likeService;
    }

    // Endpoint واحد بيشتغل كـ زرار Toggle (إعجاب / إلغاء الإعجاب)
    [HttpPost]
    public async Task<IActionResult> ToggleLike(int postId)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        if (!int.TryParse(userIdString, out int userId))
            return Unauthorized(new { message = "توكن غير صالح." });

        try
        {
            var isLiked = await _likeService.ToggleLikeAsync(postId, userId);
            var count = await _likeService.GetLikesCountAsync(postId);

            var message = isLiked ? "تم تسجيل الإعجاب." : "تم إلغاء الإعجاب.";
            return Ok(new { message, isLiked, likesCount = count });
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    // Endpoint لمعرفة عدد الإعجابات على البوست
    [HttpGet]
    public async Task<IActionResult> GetLikesCount(int postId)
    {
        var count = await _likeService.GetLikesCountAsync(postId);
        return Ok(new { postId, likesCount = count });
    }
}