namespace Models;

public class TextWidget
{
    public Guid WidgetId { get; set; }
    public string Data { get; set; } = "";

    public Widget Widget { get; set; } = null!;
}