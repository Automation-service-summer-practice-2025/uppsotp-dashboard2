# Конструктор дашборда

## ⚙️ Требования

Убедитесь, что у вас установлен:

- **Docker**
  [Скачать Docker Desktop](https://www.docker.com/products/docker-desktop/)

## 🚀 Запуск проекта

### Через Docker

1. Клонировать репозиторий:

```bash
git clone https://github.com/Automation-service-summer-practice-2025/uppsotp-dashboard2.git
cd dashboard-angular/frontend
```

2. Запустить контейнер:

```bash
docker-compose up --build
```

3. Открыть в браузере: http://localhost:4200

#### Дополнительные команды Docker:

```bash
# Запуск в фоновом режиме
docker-compose up -d --build

# Просмотр логов
docker-compose logs
```

## 🛠️ Если вносите изменения в код

```bash
# Пересоберите контейнер после изменений
docker-compose down
docker-compose build --no-cache
docker-compose up
```
