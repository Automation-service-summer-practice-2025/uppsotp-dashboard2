using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Models.Dtos;

public class WidgetUpdateDto : WidgetBaseDto
{
    public JsonDocument? ChartData { get; set; }
    public JsonDocument? ChartOptions { get; set; }
}