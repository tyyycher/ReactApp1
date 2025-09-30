// Аналогично ClientsController, но для Staff
// ВАЖНО: пароль возвращается — в продакшене это запрещено, но для админки — допустимо
// Если не хочешь отдавать пароль — создай DTO без Password

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Data;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StaffController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Staff>>> Get() =>
        await _context.Staff.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Staff>> GetById(int id)
    {
        var staff = await _context.Staff.FindAsync(id);
        return staff == null ? NotFound() : staff;
    }

    [HttpPost]
    public async Task<ActionResult<Staff>> Create(Staff staff)
    {
        _context.Staff.Add(staff);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = staff.ID_Staff }, staff);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Staff staff)
    {
        if (id != staff.ID_Staff) return BadRequest();
        _context.Entry(staff).State = EntityState.Modified;
        try { await _context.SaveChangesAsync(); }
        catch (DbUpdateConcurrencyException) when (!_context.Staff.Any(e => e.ID_Staff == id))
        { return NotFound(); }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var staff = await _context.Staff.FindAsync(id);
        if (staff == null) return NotFound();
        _context.Staff.Remove(staff);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}