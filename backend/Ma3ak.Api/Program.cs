
using Ma3ak.Api.Data;
using Ma3ak.Api.Middlewares;
using Ma3ak.Api.Services.Auth;
using Ma3ak.Api.Services.Comment;
using Ma3ak.Api.Services.post;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Text;

namespace Ma3ak.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            

            // ????? Serilog ????? ?? ???????? ????? ?? ????? ????? ???????
            builder.Host.UseSerilog((context, configuration) =>
                configuration
                    .ReadFrom.Configuration(context.Configuration)
                    .WriteTo.Console()
                    .WriteTo.File("Logs/ma3ak-log-.txt", rollingInterval: RollingInterval.Day)
            );

            // Add services to the container.
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
                    };
                });

            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("Frontend", policy =>
                {
                    policy
                        .WithOrigins("http://localhost:3000", "https://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                });
            });
            builder.Services.Configure<Ma3ak.Api.Settings.JwtSettings>(builder.Configuration.GetSection("Jwt"));
            builder.Services.AddDbContext<ApplicationDbContext>(o =>
                  o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<IPostService, PostService>();
            builder.Services.AddScoped<ICommentService, CommentService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseHttpsRedirection();

            app.UseCors("Frontend");
            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
