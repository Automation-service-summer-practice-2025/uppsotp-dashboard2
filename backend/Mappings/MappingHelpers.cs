using Models;
using Models.Dtos;
using System.Text.Json;

namespace Mappings
{
    public static class WidgetMappingExtensions
    {
        public static WidgetGetDto ToDto(this Widget w)
        {
            var dto = new WidgetGetDto
            {
                Id = w.Id,
                Type = w.Type,
                PositionX = w.PositionX,
                PositionY = w.PositionY,
                Columns = w.Columns,
                Rows = w.Rows
            };

            switch (w.Type.ToLower())
            {
                case "text":
                    dto.HtmlContent = w.TextWidget?.HtmlContent;
                    break;

                case "image":
                    dto.PreviewUrl = w.ImageWidget?.PreviewUrl;
                    break;

                case "chart":
                    if (w.ChartWidget != null)
                    {
                        dto.ChartType = w.ChartWidget.ChartType;
                        dto.Data = w.ChartWidget.ChartData;
                        dto.Options = w.ChartWidget.ChartOptions;
                        dto.BackgroundColor = w.ChartWidget.BackgroundColor;
                        dto.BorderWidth = w.ChartWidget.BorderWidth;
                        dto.CategoryPercentage = w.ChartWidget.CategoryPercentage;
                        dto.ShowLegend = w.ChartWidget.ShowLegend;
                        dto.ShowGrid = w.ChartWidget.ShowGrid;
                        dto.CsvRawData = w.ChartWidget.CsvRawData;
                        dto.CsvHeaders = w.ChartWidget.CsvHeaders;
                    }
                    break;

                case "table":
                    if (w.TableWidget != null)
                    {
                        dto.ColumnsTable = w.TableWidget.ColumnsTable;
                        dto.RowsTable = w.TableWidget.RowsTable;
                        dto.GridApi = w.TableWidget.GridApi;
                    }
                    break;
            }

            return dto;
        }

        public static Widget ToEntity(this WidgetCreateDto dto)
        {
            var typeOk = Enum.TryParse<WidgetType>(dto.Type, true, out var type);
            if (!typeOk) throw new ArgumentException($"Unsupported type '{dto.Type}'.");

            var widget = new Widget
            {
                Type = type.ToString(),
                PositionX = dto.PositionX,
                PositionY = dto.PositionY,
                Columns = dto.Columns,
                Rows = dto.Rows
            };

            switch (type)
            {
                case WidgetType.Text:
                    widget.TextWidget = new TextWidget
                    {
                        HtmlContent = dto.HtmlContent
                    };
                    break;

                case WidgetType.Image:
                    widget.ImageWidget = new ImageWidget
                    {
                        PreviewUrl = dto.PreviewUrl
                    };
                    break;

                case WidgetType.Chart:
                    widget.ChartWidget = new ChartWidget
                    {
                        ChartType = dto.ChartType ?? string.Empty,
                        ChartData = dto.ChartData,
                        ChartOptions = dto.ChartOptions,
                        BackgroundColor = dto.BackgroundColor ?? string.Empty,
                        BorderWidth = dto.BorderWidth ?? 0,
                        CategoryPercentage = dto.CategoryPercentage ?? 0,
                        ShowLegend = dto.ShowLegend ?? false,
                        ShowGrid = dto.ShowGrid ?? false,
                        CsvRawData = dto.CsvRawData ?? string.Empty,
                        CsvHeaders = dto.CsvHeaders ?? new List<string>()
                    };
                    break;

                case WidgetType.Table:
                    widget.TableWidget = new TableWidget
                    {
                        ColumnsTable = dto.ColumnsTable,
                        RowsTable = dto.RowsTable,
                        GridApi = dto.GridApi
                    };
                    break;
            }

            return widget;
        }
    }
}