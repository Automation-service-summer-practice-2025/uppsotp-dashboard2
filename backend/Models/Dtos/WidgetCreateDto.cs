using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Models.Dtos;

public class WidgetCreateDto : WidgetBaseDto
{
    public string Type { get; set; } = string.Empty;
    public JsonDocument? ChartData { get; set; }
    public JsonDocument? ChartOptions { get; set; }
}

