namespace ReactApp1.Server.Models;

public class OrderDetail
{
    public int ID_Order_Detail { get; set; }
    public int ID_Order { get; set; }
    public int ID_Product { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal Total_price { get; set; }

    // Навигация
    public Order? Order { get; set; }
    public Product? Product { get; set; }
}