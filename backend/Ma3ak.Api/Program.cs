
using Ma3ak.Api.Data;
using Ma3ak.Api.Middlewares;
using Ma3ak.Api.Services.Auth;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System;

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

            builder.Services.AddControllers();
            builder.Services.Configure<Ma3ak.Api.Settings.JwtSettings>(builder.Configuration.GetSection("Jwt"));
            builder.Services.AddDbContext<ApplicationDbContext>(o =>
                  o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IAuthService, AuthService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
