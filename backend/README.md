# Start docker-containers:
```
docker-compose up --build
docker-compose up -d
```
Postgres container (port 5432)
Api container (port 5062)

# To connect to Postgres:
```
Host: localhost
Port: 5432
Database: WidgetDb
User: user
Password: password123
```

API will be available at:
```
http://localhost:5062/swagger
```