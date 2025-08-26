using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models;

public class ImageWidget
{
    [Key, ForeignKey(nameof(Widget))]
    public Guid Id { get; set; }

    public string? PreviewUrl { get; set; }

    public Widget Widget { get; set; } = null!;
}