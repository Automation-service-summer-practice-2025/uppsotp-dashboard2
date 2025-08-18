FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
     WORKDIR /app
     EXPOSE 5001
     EXPOSE 5000

     FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
     WORKDIR /src
     COPY ["Dashboard.csproj", "./"]
     RUN dotnet restore "./Dashboard.csproj"
     COPY . .
     WORKDIR "/src/."
     RUN dotnet build "Dashboard.csproj" -c Release -o /app/build

     FROM build AS publish
     RUN dotnet publish "Dashboard.csproj" -c Release -o /app/publish

     FROM base AS final
     WORKDIR /app
     COPY --from=publish /app/publish .
     ENTRYPOINT ["dotnet", "Dashboard.dll"]