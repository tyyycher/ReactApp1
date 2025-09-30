// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;
using ReactApp1.Server.Models.DTO;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] ReactApp1.Server.Models.DTO.LoginRequest request)
    {
        // Проверяем, что данные пришли
        if (string.IsNullOrWhiteSpace(request.Login) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest("Логин и пароль обязательны.");
        }

        // Ищем сотрудника по логину
        var staff = await _context.Staff
            .FirstOrDefaultAsync(s => s.Login == request.Login);

        // Если не найден — ошибка
        if (staff == null)
        {
            return Unauthorized("Неверный логин или пароль.");
        }

        // Сравниваем пароль (временно — в открытом виде!)
        if (staff.Password != request.Password)
        {
            return Unauthorized("Неверный логин или пароль.");
        }

        // Успешный вход
        return Ok(new
        {
            message = "Успешный вход",
            staffId = staff.ID_Staff,
            name = $"{staff.Surname} {staff.Name}"
        });
    }
}