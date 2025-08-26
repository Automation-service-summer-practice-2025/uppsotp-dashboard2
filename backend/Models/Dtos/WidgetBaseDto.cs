using System.Text.Json;

public class WidgetBaseDto
{
    //public string Type { get; set; } = string.Empty;
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Columns { get; set; }
    public int Rows { get; set; }

    // Text Widget properties
    public string? HtmlContent { get; set; }

    // Image Widget properties
    public string? PreviewUrl { get; set; }

    // Chart Widget properties
    public string? ChartType { get; set; }
    public JsonDocument? Data { get; set; }
    public JsonDocument? Options { get; set; }
    public string? BackgroundColor { get; set; }
    public int? BorderWidth { get; set; }
    public double? CategoryPercentage { get; set; }
    public bool? ShowLegend { get; set; }
    public bool? ShowGrid { get; set; }
    public string? CsvRawData { get; set; }
    public List<string>? CsvHeaders { get; set; }

    // Table Widget properties
    public JsonDocument? ColumnsTable { get; set; }
    public JsonDocument? RowsTable { get; set; }
    public JsonDocument? GridApi { get; set; }
}