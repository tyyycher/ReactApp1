namespace ReactApp1.Server.Models;

public class Order
{
    public int ID_Order { get; set; }
    public int ID_Client { get; set; }
    public int ID_Staff { get; set; }
    public DateTime Date_Orders { get; set; }
    public decimal General_sume { get; set; }
    public string Status { get; set; } = string.Empty;

    // Навигация
    public Client? Client { get; set; }
    public Staff? Staff { get; set; }
}