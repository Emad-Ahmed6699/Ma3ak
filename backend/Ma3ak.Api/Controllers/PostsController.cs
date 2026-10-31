using Ma3ak.Api.DTOs;
using Ma3ak.Api.Services.post;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Ma3ak.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PostsController(IPostService _postService) : Controller
    {
        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsAsync();
            return Ok(posts);
        }
        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] PostCreateDto dto)
        {
            // استخراج الـ ID الخاص بالمستخدم الحالي من الـ Claims للتوكن
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            if (!int.TryParse(userIdString, out int authorId))
            {
                return Unauthorized(new { message = "توكن غير صالح أو تعذر معرفة هوية المستخدم." });
            }

            var createdPost = await _postService.CreatePostAsync(dto, authorId);
            return Ok(createdPost);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] PostUpdateDto dto)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (!int.TryParse(userIdString, out int userId))
                return Unauthorized(new { message = "توكن غير صالح." });

            var success = await _postService.UpdatePostAsync(id, dto, userId);
            if (!success)
                return BadRequest(new { message = "فشل التعديل: البوست غير موجود أو لست صاحب هذا البوست." });

            return Ok(new { message = "تم تعديل البوست بنجاح." });
        }
        [HttpDelete("{postId}")]
        public async Task<IActionResult> DeletePost(int postId)
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            if (!int.TryParse(userIdString, out int userId))
                return Unauthorized(new { message = "توكن غير صالح." });

            var success = await _postService.DeletePostAsync(postId, userId);
            if (!success)
                return BadRequest(new { message = "فشل الحذف: البوست غير موجود أو لست صاحب هذا البوست." });

            return Ok(new { message = "تم حذف البوست بنجاح." });
        }
    
    }
}
