// TestController.cs
using Microsoft.AspNetCore.Mvc;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { test = "Кириллица: Иванов" });
    }
}