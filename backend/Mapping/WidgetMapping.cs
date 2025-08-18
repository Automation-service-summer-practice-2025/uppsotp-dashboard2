using Models;
using System.Collections.Generic;

namespace Mapping;

public static class WidgetMapping
{
    public static WidgetBaseDto ToDto(this Widget w)
    {
        var data = new Dictionary<string, object?>();

        if (w.Type == "image" && w.ImageWidget is not null)
        {
            data["data"] = w.ImageWidget.Data;
        }
        else if (w.Type == "text" && w.TextWidget is not null)
        {
            data["data"] = w.TextWidget.Data;
        }

        return new WidgetBaseDto
        {
            Id = w.Id,
            Type = w.Type,
            PositionX = w.PositionX,
            PositionY = w.PositionY,
            Columns = w.Columns,
            Rows = w.Rows,
            Data = data
        };
    }
}