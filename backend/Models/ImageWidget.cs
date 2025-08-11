namespace Models;

public class ImageWidget
{
    public Guid WidgetId { get; set; } 
    public string FileUrl { get; set; } = "";
    public string PreviewUrl { get; set; } = "";

    public required Widget Widget { get; set; }
}