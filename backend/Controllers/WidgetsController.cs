using Microsoft.AspNetCore.Mvc;
using Models;
using Persistance;
using Models.Dtos;
using Mapping;
using Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace Controllers;

[ApiController]
[Route("api/widgets")]
public class WidgetsController : ControllerBase
{
    private readonly AppDbContext _context;
    public WidgetsController(AppDbContext context) => _context = context;

    [HttpPost]
    public async Task<IActionResult> Create(WidgetCreateDto dto)
    {
        var widget = new Widget
        {
            Type = dto.Type,
            PositionX = dto.PositionX,
            PositionY = dto.PositionY,
            Columns = dto.Columns,
            Rows = dto.Rows
        };

        switch (dto.Type.ToLower())
        {
            case "text":
                widget.TextWidget = new TextWidget
                {
                    WidgetId = widget.Id,
                    Data = JsonSerializer.Serialize(dto.Data)
                };
                break;

            case "image":
                widget.ImageWidget = new ImageWidget
                {
                    WidgetId = widget.Id,
                    Data = JsonSerializer.Serialize(dto.Data)
                };
                break;
        }

        _context.Widgets.Add(widget);
        await _context.SaveChangesAsync();

        return Ok(widget);
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<WidgetBaseDto>>> GetAll()
    {
        var items = await _context.Widgets
            .AsNoTracking()
            .Include(w => w.ImageWidget)
            .Include(w => w.TextWidget)
            .Select(w => w.ToDto())
            .ToListAsync();
        return Ok(items);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateWidget(Guid id, [FromBody] WidgetUpdateDto dto)
    {
        var widget = await _context.Widgets
            .Include(w => w.ImageWidget)
            .Include(w => w.TextWidget)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (widget == null)
            return NotFound();

        if (dto.PositionX.HasValue)
            widget.PositionX = dto.PositionX.Value;
        if (dto.PositionY.HasValue)
            widget.PositionY = dto.PositionY.Value;
        if (dto.Columns.HasValue)
            widget.Columns = dto.Columns.Value;
        if (dto.Rows.HasValue)
            widget.Rows = dto.Rows.Value;

        

        await _context.SaveChangesAsync();
        return Ok(widget);
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var widget = await _context.Widgets.FirstOrDefaultAsync(w => w.Id == id);
        if (widget == null) return NotFound();

        _context.Widgets.Remove(widget);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static bool IsValidType(string? t)
        => string.Equals(t, "text", StringComparison.OrdinalIgnoreCase)
        || string.Equals(t, "image", StringComparison.OrdinalIgnoreCase);
}