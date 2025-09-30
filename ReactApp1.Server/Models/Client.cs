namespace ReactApp1.Server.Models;

public class Client
{
    public int ID_Client { get; set; }
    public string Surname { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty; // char(1) → string
    public string Phone_Number { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}