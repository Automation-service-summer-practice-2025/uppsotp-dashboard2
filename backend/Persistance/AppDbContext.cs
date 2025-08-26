using Microsoft.EntityFrameworkCore;
using Models;
using Persistance.Configurations;

namespace Persistance;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Widget> Widgets { get; set; }
    public DbSet<TextWidget> TextWidgets { get; set; }
    public DbSet<ImageWidget> ImageWidgets { get; set; }
    public DbSet<ChartWidget> ChartWidgets { get; set; }
    public DbSet<TableWidget> TableWidgets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new WidgetConf());
        modelBuilder.ApplyConfiguration(new TextWidgetConf());
        modelBuilder.ApplyConfiguration(new ImageWidgetConf());
        modelBuilder.ApplyConfiguration(new ChartWidgetConf());
        modelBuilder.ApplyConfiguration(new TableWidgetConf());
    }
}