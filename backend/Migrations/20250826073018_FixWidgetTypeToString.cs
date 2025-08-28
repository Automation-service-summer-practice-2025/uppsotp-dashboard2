using System;
using System.Collections.Generic;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dashboard.Migrations
{
    /// <inheritdoc />
    public partial class FixWidgetTypeToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Widgets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    PositionX = table.Column<int>(type: "integer", nullable: false),
                    PositionY = table.Column<int>(type: "integer", nullable: false),
                    Columns = table.Column<int>(type: "integer", nullable: false),
                    Rows = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Widgets", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ChartWidgets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ChartType = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    ChartData = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    ChartOptions = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    BackgroundColor = table.Column<string>(type: "text", nullable: false),
                    BorderWidth = table.Column<int>(type: "integer", nullable: false),
                    CategoryPercentage = table.Column<double>(type: "double precision", nullable: false),
                    ShowLegend = table.Column<bool>(type: "boolean", nullable: false),
                    ShowGrid = table.Column<bool>(type: "boolean", nullable: false),
                    CsvRawData = table.Column<string>(type: "text", nullable: false),
                    CsvHeaders = table.Column<List<string>>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChartWidgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChartWidgets_Widgets_Id",
                        column: x => x.Id,
                        principalTable: "Widgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImageWidgets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PreviewUrl = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageWidgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImageWidgets_Widgets_Id",
                        column: x => x.Id,
                        principalTable: "Widgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TableWidgets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ColumnsTable = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    RowsTable = table.Column<JsonDocument>(type: "jsonb", nullable: true),
                    GridApi = table.Column<JsonDocument>(type: "jsonb", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TableWidgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TableWidgets_Widgets_Id",
                        column: x => x.Id,
                        principalTable: "Widgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TextWidgets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    HtmlContent = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TextWidgets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TextWidgets_Widgets_Id",
                        column: x => x.Id,
                        principalTable: "Widgets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChartWidgets");

            migrationBuilder.DropTable(
                name: "ImageWidgets");

            migrationBuilder.DropTable(
                name: "TableWidgets");

            migrationBuilder.DropTable(
                name: "TextWidgets");

            migrationBuilder.DropTable(
                name: "Widgets");
        }
    }
}
