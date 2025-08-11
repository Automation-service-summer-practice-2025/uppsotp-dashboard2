using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

namespace Persistance.Configurations;

public class ImageWidgetConf : IEntityTypeConfiguration<ImageWidget>
{
    public void Configure(EntityTypeBuilder<ImageWidget> builder)
    {
        builder.HasKey(i => i.WidgetId);
    }
}