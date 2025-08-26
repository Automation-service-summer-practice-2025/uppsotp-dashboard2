using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Models;

public class TableWidget
{
    [Key, ForeignKey(nameof(Widget))]
    public Guid Id { get; set; }
    public JsonDocument? ColumnsTable { get; set; }
    public JsonDocument? RowsTable { get; set; }
    public JsonDocument? GridApi { get; set; }

    public Widget Widget { get; set; } = null!;
}