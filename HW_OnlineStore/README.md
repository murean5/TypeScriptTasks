## Запуск

Выполняем команду: `npm install`

Далее, запускаем решение: `npm run dev`

Запускаем docker образ c postgresql: `docker-compose up` (базовые credentials к локальной БД в нем же)

Запускаем сервер [server.ts](src/server.ts)

## Проверка запросов
К проекту подключен **Swagger**, по адресу `http://localhost:3000/api-docs`
