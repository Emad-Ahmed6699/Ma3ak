using System.Net;
using System.Text.Json;

namespace Ma3ak.Api.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
    {
        _next = next; // بتمثل الخطوة اللي عليها الدور في السيرفر
        _logger = logger; // عشان نسجل الخطأ
        _env = env; // عشان نعرف إحنا في بيئة التطوير ولا الإنتاج
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            // حاول تنفذ الريكوست عادي جداً
            await _next(context);
        }
        catch (Exception ex)
        {
            // لو حصل أي إيرور في أي مكان في المشروع، هنمسكه هنا
            _logger.LogError(ex, ex.Message);

            // توحيد شكل الرد ليكون JSON
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // لو إحنا في مرحلة التطوير (Development)، نرجع تفاصيل الخطأ عشان نصلحه
            // لو في الإنتاج (Production)، نرجع رسالة عامة عشان أمان السيرفر
            object response;
            if (_env.IsDevelopment())
            {
                response = (new { statusCode = context.Response.StatusCode, message = ex.Message, details = ex.StackTrace?.ToString() });
            }
            else
            {
                response = (new { statusCode = context.Response.StatusCode, message = "حدث خطأ داخلي في الخادم." });
            }

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}