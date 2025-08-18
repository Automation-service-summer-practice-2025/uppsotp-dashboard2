# Start docker-containers:
```
docker-compose up -d
```
Postgres container (port 5432)
Api container (port 5000)

# To connect to Postgres:
```
Host: localhost
Port: 5432
Database: WidgetDb
User: user
Password: password123
```
# Apply Migrations:
```
dotnet ef database update
```

# Build Project
```
dotnet build
```

# Run Project
```
dotnet run
```
API will be available at:
```
http://localhost:5062/swagger
```