// То же самое для Category
// ...

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CategoriesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet] public async Task<ActionResult<List<Category>>> Get() => await _context.Categories.ToListAsync();
    [HttpGet("{id}")] public async Task<ActionResult<Category>> GetById(int id) => await _context.Categories.FindAsync(id) is { } c ? c : NotFound();
    [HttpPost] public async Task<ActionResult<Category>> Create(Category c) { _context.Categories.Add(c); await _context.SaveChangesAsync(); return CreatedAtAction(nameof(GetById), new { id = c.ID_Categories }, c); }
    [HttpPut("{id}")] public async Task<IActionResult> Update(int id, Category c) { if (id != c.ID_Categories) return BadRequest(); _context.Entry(c).State = EntityState.Modified; try { await _context.SaveChangesAsync(); } catch (DbUpdateConcurrencyException) when (!_context.Categories.Any(x => x.ID_Categories == id)) { return NotFound(); } return NoContent(); }
    [HttpDelete("{id}")] public async Task<IActionResult> Delete(int id) { var c = await _context.Categories.FindAsync(id); if (c == null) return NotFound(); _context.Categories.Remove(c); await _context.SaveChangesAsync(); return NoContent(); }
}