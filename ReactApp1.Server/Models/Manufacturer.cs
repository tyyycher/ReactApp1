namespace ReactApp1.Server.Models;

public class Manufacturer
{
    public int ID_Manufacturer { get; set; }
    public string Company_Name { get; set; } = string.Empty;
    public DateOnly StartDate { get; set; } // date → DateOnly (в .NET 6+)
}