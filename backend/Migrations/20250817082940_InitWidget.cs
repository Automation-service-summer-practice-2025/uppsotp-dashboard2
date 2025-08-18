using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dashboard.Migrations
{
    /// <inheritdoc />
    public partial class InitWidget : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FileUrl",
                table: "ImageWidgets");

            migrationBuilder.RenameColumn(
                name: "HtmlContent",
                table: "TextWidgets",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "PreviewUrl",
                table: "ImageWidgets",
                newName: "Data");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Data",
                table: "TextWidgets",
                newName: "HtmlContent");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "ImageWidgets",
                newName: "PreviewUrl");

            migrationBuilder.AddColumn<string>(
                name: "FileUrl",
                table: "ImageWidgets",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
