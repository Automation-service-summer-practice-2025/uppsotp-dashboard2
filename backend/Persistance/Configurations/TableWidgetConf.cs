using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

namespace Persistance.Configurations;

public class TableWidgetConf : IEntityTypeConfiguration<TableWidget>
{
    public void Configure(EntityTypeBuilder<TableWidget> builder)
    {
        builder.HasKey(t => t.Id);

        builder.Property(t => t.ColumnsTable).HasColumnType("jsonb");
        builder.Property(t => t.RowsTable).HasColumnType("jsonb");
        builder.Property(t => t.GridApi).HasColumnType("jsonb");
    }
}