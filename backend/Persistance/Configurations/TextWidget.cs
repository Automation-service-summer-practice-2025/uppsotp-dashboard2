using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

namespace Persistance.Configurations;

public class TextWidgetConf : IEntityTypeConfiguration<TextWidget>
{
    public void Configure(EntityTypeBuilder<TextWidget> builder)
    {
        builder.HasKey(t => t.Id);        
    }
}