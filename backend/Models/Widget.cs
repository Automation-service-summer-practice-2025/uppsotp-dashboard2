using System.ComponentModel.DataAnnotations;

namespace Models;

public enum WidgetType
{
    Text,
    Image,
    Chart,
    Table
}

public class Widget
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Type { get; set; } = string.Empty;
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Columns { get; set; }
    public int Rows { get; set; }

    public ImageWidget? ImageWidget { get; set; }
    public TextWidget? TextWidget { get; set; }
    public TableWidget? TableWidget { get; set; }
    public ChartWidget? ChartWidget { get; set; }
}