CREATE TABLE IF NOT EXISTS events (
                                      id SERIAL PRIMARY KEY,
                                      name VARCHAR NOT NULL,
                                      total_seats INT NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
                                        id SERIAL PRIMARY KEY,
                                        event_id INT REFERENCES events(id) ON DELETE CASCADE,
    user_id VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT now()
    );

-- Гарантируем, что один и тот же пользователь не может создать два бронирования на одно событие
CREATE UNIQUE INDEX IF NOT EXISTS bookings_event_user_unique ON bookings(event_id, user_id);

-- Индекс по event_id для ускорения подсчёта
CREATE INDEX IF NOT EXISTS bookings_event_idx ON bookings(event_id);
