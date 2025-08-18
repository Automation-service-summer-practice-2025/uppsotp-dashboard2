using System.ComponentModel.DataAnnotations;
using Interfaces;
public class WidgetUpdateDto
{
    public string? Type { get; set; }
    public int? PositionX { get; set; }
    public int? PositionY { get; set; }
    public int? Columns { get; set; }
    public int? Rows { get; set; }

    public Dictionary<string, object?>? Data { get; set; } = new();
}

public class TextWidgetUpdateDto : IWidgetUpdateData
{
    public string Data { get; set; } = string.Empty;
}

public class ImageWidgetUpdateDto : IWidgetUpdateData
{
    public string Data { get; set; } = string.Empty;
}