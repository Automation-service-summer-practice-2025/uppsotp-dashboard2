public class WidgetBaseDto
{
    public Guid Id { get; set; }
    public string Type { get; set; } = "";
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Columns { get; set; }
    public int Rows { get; set; }

    public Dictionary<string, object?> Data { get; set; } = new();
}
