using ReactApp1.Server.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Encodings.Web;
using System.Text.Unicode;

var builder = WebApplication.CreateBuilder(args);

// Настройка контроллеров с поддержкой кириллицы
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

    

// Подключение к БД
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// OpenAPI
builder.Services.AddOpenApi();

var app = builder.Build();

app.Use((context, next) =>
{
    if (context.Response.ContentType == null ||
        context.Response.ContentType.StartsWith("application/json", StringComparison.OrdinalIgnoreCase))
    {
        context.Response.ContentType = "application/json; charset=utf-8";
    }
    return next();
});

// Поддержка SPA
app.UseDefaultFiles();
app.UseStaticFiles(); // ← Важно: UseStaticFiles после UseDefaultFiles
app.MapStaticAssets();

// CORS — разрешаем запросы с React
app.UseCors(policy => policy
    .WithOrigins("http://localhost:5173", "https://localhost:5173")
    .AllowAnyMethod()
    .AllowAnyHeader());

// OpenAPI endpoint
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();