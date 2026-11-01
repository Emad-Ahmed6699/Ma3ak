using Ma3ak.Api.DTOs;
using Ma3ak.Api.Services.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

[Route("api/posts/{postId}/comments")]
[ApiController]
[Authorize]
public class CommentsController : ControllerBase
{
    private readonly ICommentService _commentService;

    public CommentsController(ICommentService commentService)
    {
        _commentService = commentService;
    }

    // جلب كل تعليقات بوست معين
    [HttpGet]
    public async Task<IActionResult> GetComments(int postId)
    {
        var comments = await _commentService.GetCommentsByPostIdAsync(postId);
        return Ok(comments);
    }

    // إضافة تعليق جديد على بوست
    [HttpPost]
    public async Task<IActionResult> AddComment(int postId, [FromBody] CommentCreateDto dto)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        if (!int.TryParse(userIdString, out int userId))
            return Unauthorized(new { message = "توكن غير صالح." });

        var comment = await _commentService.AddCommentAsync(postId, dto, userId);
        if (comment == null)
            return NotFound(new { message = "البوست غير موجود." });

        return Ok(comment);
    }

    // حذف تعليق (Endpoint مستقلة بالـ commentId)
    [HttpDelete("/api/comments/{id}")]
    public async Task<IActionResult> DeleteComment(int id)
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
        if (!int.TryParse(userIdString, out int userId))
            return Unauthorized(new { message = "توكن غير صالح." });

        var success = await _commentService.DeleteCommentAsync(id, userId);
        if (!success)
            return BadRequest(new { message = "فشل الحذف: التعليق غير موجود أو لست صاحب هذا التعليق." });

        return Ok(new { message = "تم حذف التعليق بنجاح." });
    }
}