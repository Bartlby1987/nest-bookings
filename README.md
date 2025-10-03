# NestJS Bookings API

Проект на NestJS с PostgreSQL для управления событиями и бронированиями.

---

## 📌 Технологии

- **Backend:** NestJS  
- **ORM:** TypeORM  
- **База данных:** PostgreSQL  
- **Язык:** TypeScript  
- **HTTP клиент:** Postman / curl

---

## ⚙ Локальная установка

### 1️⃣ Клонирование проекта

```bash
git clone <репозиторий>
cd nest-bookings
```

### 2️⃣ Установка зависимостей

```bash
npm install
```

### 3️⃣ Настройка базы данных PostgreSQL

Создайте базу данных и пользователя (локально):

```sql
CREATE DATABASE bookings_db;
CREATE USER postgres WITH ENCRYPTED PASSWORD 'root';
GRANT ALL PRIVILEGES ON DATABASE bookings_db TO postgres;
```

### 4️⃣ Настройка `.env`

Создайте файл `.env` в корне проекта:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=root
DB_NAME=bookings_db
```

> Убедитесь, что настройки совпадают с вашей локальной PostgreSQL.

### 5️⃣ Запуск проекта

```bash
npm run start:dev
```

Сервер будет доступен по адресу: [http://localhost:3000/api](http://localhost:3000/api)

> Если порт 3000 занят, измените `PORT` в `.env`.

---

## 🗂 Структура проекта

```
src/
├─ events/
│  ├─ dto/
│  │  └─ create-event.dto.ts
│  ├─ entities/
│  │  └─ event.entity.ts
│  ├─ events.controller.ts
│  └─ events.service.ts
├─ bookings/
│  ├─ entities/
│  │  └─ booking.entity.ts
│  ├─ bookings.controller.ts
│  └─ bookings.service.ts
├─ app.module.ts
└─ main.ts
```

---

## 🔗 Endpoints

### События

| Метод | URL | Описание |
|-------|-----|----------|
| GET   | `/api/events` | Список всех событий |
| GET   | `/api/events/:id` | Получить событие по ID |
| POST  | `/api/events` | Создать новое событие |

**Пример POST запроса:**

```json
POST /api/events
{
  "name": "Local Conference",
  "total_seats": 50
}
```

### Бронирования

| Метод | URL | Описание |
|-------|-----|----------|
| POST  | `/api/bookings/reserve` | Забронировать место на событие |

**Пример POST запроса:**

```json
POST /api/bookings/reserve
{
  "event_id": 1,
  "seats": 2
}
```

---

## ⚡ Полезные команды

- Запуск сервера: `npm run start:dev`  
- Сборка TypeScript: `npm run build`  
- Проверка миграций TypeORM: `npm run typeorm:show`

---

## 🛡 Советы

- Никогда не коммитить `.env` в репозиторий.  
- Для продакшена используйте миграции TypeORM вместо `synchronize: true`.  
- Проверяйте доступность порта перед запуском сервера.  
- Используйте Postman или curl для тестирования API.

---

## 🚀 Запуск Postman

1. Откройте Postman и создайте коллекцию.
2. Добавьте запросы к вашим эндпоинтам (`GET /api/events`, `POST /api/events`, `POST /api/bookings/reserve`).
3. Установите заголовок `Content-Type: application/json` для POST-запросов.

---