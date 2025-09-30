// Аналогично
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class ManufacturersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    public ManufacturersController(ApplicationDbContext context) => _context = context;

    [HttpGet] public async Task<ActionResult<List<Manufacturer>>> Get() => await _context.Manufacturers.ToListAsync();
    [HttpGet("{id}")] public async Task<ActionResult<Manufacturer>> GetById(int id) => await _context.Manufacturers.FindAsync(id) is { } m ? m : NotFound();
    [HttpPost] public async Task<ActionResult<Manufacturer>> Create(Manufacturer m) { _context.Manufacturers.Add(m); await _context.SaveChangesAsync(); return CreatedAtAction(nameof(GetById), new { id = m.ID_Manufacturer }, m); }
    [HttpPut("{id}")] public async Task<IActionResult> Update(int id, Manufacturer m) { if (id != m.ID_Manufacturer) return BadRequest(); _context.Entry(m).State = EntityState.Modified; try { await _context.SaveChangesAsync(); } catch (DbUpdateConcurrencyException) when (!_context.Manufacturers.Any(x => x.ID_Manufacturer == id)) { return NotFound(); } return NoContent(); }
    [HttpDelete("{id}")] public async Task<IActionResult> Delete(int id) { var m = await _context.Manufacturers.FindAsync(id); if (m == null) return NotFound(); _context.Manufacturers.Remove(m); await _context.SaveChangesAsync(); return NoContent(); }
}