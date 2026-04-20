// Импорт библиотеки Zod для валидации данных
import { z } from "zod";
// Импорт кастомного класса ошибок
import AppError from "../utils/appError.js";

// Универсальная функция-валидатор, принимает схему Zod
export function validate(schema) {
    return (req, res, next) => {
        // Безопасная проверка данных из тела запроса
        const result = schema.safeParse(req.body);
        
        // Если валидация не прошла (данные не соответствуют схеме)
        if (!result.success) {
            // Берём текст первой ошибки и передаём в обработчик
            return next(new AppError(result.error.errors[0].message, 400));
        }
        
        // Если всё хорошо, заменяем req.body на очищенные и валидированные данные
        req.body = result.data;
        next();
    };
}
// Схема валидации для регистрации пользователя
export const registerSchema = z.object({
    // Email должен быть корректным адресом электронной почты
    email: z.email(),
    // Пароль должен быть строкой длиной минимум 8 символов
    password: z.string().min(8),
    // Имя опционально, но если указано - не должно быть пустым
    name: z.string().min(1).optional(),
});
// Схема валидации для входа пользователя
export const loginSchema = z.object({
    // Email должен быть корректным адресом электронной почты
    email: z.email(),
    // Пароль должен быть строкой длиной минимум 8 символов
    password: z.string().min(8),
});