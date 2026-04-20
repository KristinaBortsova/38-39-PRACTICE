// Загрузка переменных окружения из файла .env
import "dotenv/config";
// Импорт настроенного Express приложения
import app from "./src/app.js";
// Импорт конфигурации (порт и другие настройки)
import config from "./src/config.js";

// Асинхронная функция запуска сервера
const startServer = async () => {
    try {
        // Запуск сервера на указанном порту
        app.listen(config.port, () => {
            console.log(`Сервер запущен на порту http://localhost:${config.port}`);
            console.log(
                `Документация доступна на http://localhost:${config.port}/api/docs`,
            );
        });
    } catch (err) {
        // Обработка ошибок при запуске сервера
        console.error("Не удалось запустить сервер:", err);
    }
};

// Запуск сервера
startServer();