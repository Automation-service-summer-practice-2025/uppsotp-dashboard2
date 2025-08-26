using Microsoft.AspNetCore.Mvc;
using Models;
using Persistance;
using Models.Dtos;
using Mappings;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace Controllers;

[ApiController]
[Route("api/widgets")]
public class WidgetsController : ControllerBase
{
    private readonly AppDbContext _db;
    public WidgetsController(AppDbContext db) => _db = db;

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] WidgetCreateDto dto)
    {
        try
        {
            var widget = dto.ToEntity();
            
            _db.Widgets.Add(widget);
            await _db.SaveChangesAsync();

            var resultDto = widget.ToDto();
            return Ok(resultDto);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<WidgetGetDto>>> GetAll()
    {
        var widgets = await _db.Widgets
            .AsNoTracking()
            .Include(w => w.ImageWidget)
            .Include(w => w.TextWidget)
            .Include(w => w.ChartWidget)
            .Include(w => w.TableWidget)
            .ToListAsync();


        var dtos = widgets.Select(w => w.ToDto()).ToList();
        return Ok(dtos);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateWidget(Guid id, [FromBody] WidgetUpdateDto dto)
    {
        var widget = await _db.Widgets
            .Include(w => w.ImageWidget)
            .Include(w => w.TextWidget)
            .Include(w => w.ChartWidget)
            .Include(w => w.TableWidget)
            .FirstOrDefaultAsync(w => w.Id == id);

        if (widget == null)
            return NotFound();
            
        var existingType = widget.Type.ToLower();

        widget.PositionX = dto.PositionX;
        widget.PositionY = dto.PositionY;
        widget.Columns = dto.Columns;
        widget.Rows = dto.Rows;

        var typeOk = Enum.TryParse<WidgetType>(existingType, true, out var type);
        if (!typeOk) return BadRequest($"Unsupported type '{existingType}'.");

        widget.Type = type.ToString();

        switch (existingType.ToLower())
        {
            case "text":
                if (widget.TextWidget == null)
                    widget.TextWidget = new TextWidget { Id = widget.Id };

                widget.TextWidget.HtmlContent = dto.HtmlContent;
                break;

            case "image":
                if (widget.ImageWidget == null)
                    widget.ImageWidget = new ImageWidget { Id = widget.Id };

                widget.ImageWidget.PreviewUrl = dto.PreviewUrl;
                break;

            case "chart":
                if (widget.ChartWidget == null)
                    widget.ChartWidget = new ChartWidget { Id = widget.Id };

                widget.ChartWidget.ChartType = dto.ChartType ?? "";
                widget.ChartWidget.ChartData = dto.ChartData;
                widget.ChartWidget.ChartOptions = dto.ChartOptions;
                widget.ChartWidget.BackgroundColor = dto.BackgroundColor ?? "";
                widget.ChartWidget.BorderWidth = dto.BorderWidth ?? 0;
                widget.ChartWidget.CategoryPercentage = dto.CategoryPercentage ?? 0;
                widget.ChartWidget.ShowLegend = dto.ShowLegend ?? false;
                widget.ChartWidget.ShowGrid = dto.ShowGrid ?? false;
                widget.ChartWidget.CsvRawData = dto.CsvRawData ?? "";
                widget.ChartWidget.CsvHeaders = dto.CsvHeaders ?? new List<string>();
                break;

            case "table":
                if (widget.TableWidget == null)
                    widget.TableWidget = new TableWidget { Id = widget.Id };

                widget.TableWidget.ColumnsTable = dto.ColumnsTable;
                widget.TableWidget.RowsTable = dto.RowsTable;
                widget.TableWidget.GridApi = dto.GridApi;
                break;

            default:
                return BadRequest($"Unknown widget type: {existingType}");
        }

        await _db.SaveChangesAsync();
        return Ok(widget.ToDto());
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var widget = await _db.Widgets.FirstOrDefaultAsync(w => w.Id == id);
        if (widget == null) return NotFound();

        _db.Widgets.Remove(widget);
        await _db.SaveChangesAsync();

        return NoContent();
    }

}