namespace ReactApp1.Server.Models;

public class Product
{
    public int ID_Product { get; set; }
    public string Title { get; set; } = string.Empty;
    public int ID_Manufacturer { get; set; }
    public int ID_Categories { get; set; }
    public decimal Price { get; set; }

    // Навигационные свойства (опционально)
    public Manufacturer? Manufacturer { get; set; }
    public Category? Category { get; set; }
}