using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Models;

public class ChartWidget
{
    [Key, ForeignKey(nameof(Widget))]
    public Guid Id { get; set; }

    public string ChartType { get; set; } = string.Empty;
    public JsonDocument? ChartData { get; set; }
    public JsonDocument? ChartOptions { get; set; }
    public string BackgroundColor { get; set; } = string.Empty;
    public int BorderWidth { get; set; }
    public double CategoryPercentage { get; set; }
    public bool ShowLegend { get; set; }
    public bool ShowGrid { get; set; }

    public string CsvRawData { get; set; } = string.Empty;
    public List<string> CsvHeaders { get; set; } = new();

    public Widget Widget { get; set; } = null!;
}