namespace Models;

public class ImageWidget
{
    public Guid WidgetId { get; set; } 
    public string Data { get; set; } = "";

    public Widget Widget { get; set; } = null!;
}