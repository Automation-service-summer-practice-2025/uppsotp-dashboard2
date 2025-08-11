namespace Models;

public class Widget
{
    public Guid Id { get; set; }
    public required string Type { get; set; }
    public int PositionX { get; set; }
    public int PositionY { get; set; }
    public int Columns { get; set; }
    public int Rows { get; set; }

    public ImageWidget? ImageWidget { get; set; }
    public TextWidget? TextWidget { get; set; }
}