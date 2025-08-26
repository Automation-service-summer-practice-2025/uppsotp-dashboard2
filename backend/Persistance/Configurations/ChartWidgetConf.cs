using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

namespace Persistance.Configurations;

public class ChartWidgetConf : IEntityTypeConfiguration<ChartWidget>
{
    public void Configure(EntityTypeBuilder<ChartWidget> builder)
    {
        builder.HasKey(c => c.Id);

        builder.Property(c => c.BackgroundColor).IsRequired();
        builder.Property(c => c.CsvRawData).IsRequired();

        builder.Property(c => c.CsvHeaders).HasColumnType("text[]");
        builder.Property(c => c.ChartType).HasMaxLength(64);
        builder.Property(c => c.ChartData).HasColumnType("jsonb");
        builder.Property(c => c.ChartOptions).HasColumnType("jsonb");
        builder.Property(c => c.CsvRawData).HasColumnType("text");
        
    }
}