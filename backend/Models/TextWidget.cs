namespace Models;

public class TextWidget
{
    public Guid WidgetId { get; set; }
    public string HtmlContent { get; set; } = "";

    public required Widget Widget { get; set; }
}