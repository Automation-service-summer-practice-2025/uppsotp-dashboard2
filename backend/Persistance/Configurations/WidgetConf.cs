using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

namespace Persistance.Configurations;

public class WidgetConf : IEntityTypeConfiguration<Widget>
{
    public void Configure(EntityTypeBuilder<Widget> builder)
    {
        builder.HasKey(w => w.Id);
        builder.Property(w => w.Type).IsRequired();
        builder.Property(w => w.PositionX).IsRequired();
        builder.Property(w => w.PositionY).IsRequired();
        builder.Property(w => w.Columns).IsRequired();
        builder.Property(w => w.Rows).IsRequired();

        builder.HasOne(w => w.ImageWidget)
               .WithOne(i => i.Widget)
               .HasForeignKey<ImageWidget>(i => i.WidgetId);

        builder.HasOne(w => w.TextWidget)
               .WithOne(t => t.Widget)
               .HasForeignKey<TextWidget>(t => t.WidgetId);
    }
}