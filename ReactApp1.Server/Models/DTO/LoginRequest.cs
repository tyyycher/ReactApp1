// Models/DTO/LoginRequest.cs
namespace ReactApp1.Server.Models.DTO;

public class LoginRequest
{
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}