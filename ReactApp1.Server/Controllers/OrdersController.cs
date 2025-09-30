using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public OrdersController(ApplicationDbContext context) => _context = context;

    [HttpGet]
    [HttpGet]
    public async Task<ActionResult<List<Order>>> Get() =>
    await _context.Orders
        .Include(o => o.Client)
        .Include(o => o.Staff)
        .ToListAsync();

    [HttpGet("{id}")] public async Task<ActionResult<Order>> GetById(int id) => await _context.Orders.FindAsync(id) is { } o ? o : NotFound();
    [HttpPost] public async Task<ActionResult<Order>> Create(Order o) { _context.Orders.Add(o); await _context.SaveChangesAsync(); return CreatedAtAction(nameof(GetById), new { id = o.ID_Order }, o); }
    [HttpPut("{id}")] public async Task<IActionResult> Update(int id, Order o) { if (id != o.ID_Order) return BadRequest(); _context.Entry(o).State = EntityState.Modified; try { await _context.SaveChangesAsync(); } catch (DbUpdateConcurrencyException) when (!_context.Orders.Any(x => x.ID_Order == id)) { return NotFound(); } return NoContent(); }
    [HttpDelete("{id}")] public async Task<IActionResult> Delete(int id) { var o = await _context.Orders.FindAsync(id); if (o == null) return NotFound(); _context.Orders.Remove(o); await _context.SaveChangesAsync(); return NoContent(); }
}