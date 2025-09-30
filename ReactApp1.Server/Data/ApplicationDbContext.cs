// Data/ApplicationDbContext.cs
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Client> Clients => Set<Client>();
    public DbSet<Staff> Staff => Set<Staff>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Manufacturer> Manufacturers => Set<Manufacturer>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderDetail> OrderDetails => Set<OrderDetail>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // === Указываем точные имена таблиц из твоей БД ProAuto ===
        modelBuilder.Entity<Client>().ToTable("Client");
        modelBuilder.Entity<Staff>().ToTable("Staff");
        modelBuilder.Entity<Category>().ToTable("Categories");
        modelBuilder.Entity<Manufacturer>().ToTable("Manufacturer");
        modelBuilder.Entity<Product>().ToTable("Products");
        modelBuilder.Entity<Order>().ToTable("Orders");
        modelBuilder.Entity<OrderDetail>().ToTable("Details_Order");

        // === Первичные ключи (EF обычно угадывает, но укажем явно для надёжности) ===
        modelBuilder.Entity<Client>().HasKey(c => c.ID_Client);
        modelBuilder.Entity<Staff>().HasKey(s => s.ID_Staff);
        modelBuilder.Entity<Category>().HasKey(c => c.ID_Categories);
        modelBuilder.Entity<Manufacturer>().HasKey(m => m.ID_Manufacturer);
        modelBuilder.Entity<Product>().HasKey(p => p.ID_Product);
        modelBuilder.Entity<Order>().HasKey(o => o.ID_Order);
        modelBuilder.Entity<OrderDetail>().HasKey(od => od.ID_Order_Detail);

        // === Внешние ключи и связи ===
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Client)
            .WithMany()
            .HasForeignKey(o => o.ID_Client);

        modelBuilder.Entity<Order>()
            .HasOne(o => o.Staff)
            .WithMany()
            .HasForeignKey(o => o.ID_Staff);

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Category)
            .WithMany()
            .HasForeignKey(p => p.ID_Categories);

        modelBuilder.Entity<Product>()
            .HasOne(p => p.Manufacturer)
            .WithMany()
            .HasForeignKey(p => p.ID_Manufacturer);

        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Order)
            .WithMany()
            .HasForeignKey(od => od.ID_Order);

        modelBuilder.Entity<OrderDetail>()
            .HasOne(od => od.Product)
            .WithMany()
            .HasForeignKey(od => od.ID_Product);

        // === Опционально: если хочешь, чтобы EF не пытался создавать эти таблицы ===
        // (полезно, если БД уже существует и управляется вручную)
        modelBuilder.Entity<Client>().HasData(); // отключает миграции для этой сущности
        // Но лучше просто не запускать Add-Migration / Update-Database
    }
}