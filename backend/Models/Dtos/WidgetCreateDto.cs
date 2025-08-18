using System.ComponentModel.DataAnnotations;
using Interfaces;

namespace Models.Dtos;

public class WidgetCreateDto
{
    public string Type { get; set; } = "";
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Columns { get; set; }
    public int Rows { get; set; }

    [Required]
    public Dictionary<string, object?> Data { get; set; } = new();
}

public class TextWidgetCreateDto : IWidgetCreateData
{
    public string Data { get; set; } = string.Empty;
}

public class ImageWidgetCreateDto : IWidgetCreateData
{
    public string Data { get; set; } = string.Empty;
}
