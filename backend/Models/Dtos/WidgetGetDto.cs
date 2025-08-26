namespace Models.Dtos;

public class WidgetGetDto : WidgetBaseDto
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;
}
