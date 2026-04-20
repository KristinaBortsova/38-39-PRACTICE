// Импорт всех функций из сервиса аутентификации
import * as authService from '../services/authService.js'

// Контроллер для регистрации нового пользователя
export async function register(req, res, next) {
    try {
        // Извлекаем данные из тела запроса (уже провалидированные)
        const { email, password, name } = req.body
        // Вызываем сервис регистрации, который создаёт пользователя
        const { user, session } = await authService.register(email, password, name)
        // Возвращаем успешный ответ с кодом 201 (Created)
        res.status(201).json({ user, session })
    } catch (error) {
        // При возникновении ошибки передаём её в глобальный обработчик
        next(error)
    }
}

// Контроллер для входа пользователя в систему
export async function login(req, res, next) {
    try {
        // Извлекаем email и пароль из тела запроса
        const { email, password } = req.body
        // Вызываем сервис входа, который проверяет учётные данные
        const { session } = await authService.login(email, password)
        // Возвращаем успешный ответ с кодом 200
        res.status(200).json({ session })
    } catch (error) {
        // Передаём ошибку в обработчик
        next(error)
    }
}

// Контроллер для выхода пользователя из системы
export async function logout(req, res, next) {
    try {
        // Вызываем сервис выхода, который извлекает токен из заголовка Authorization
        await authService.logout(req.headers.authorization.split(' ')[1])
        // Возвращаем успешный ответ с сообщением
        res.status(200).json({ message: 'Выход выполнен' })
    } catch (error) {
        // Передаём ошибку в обработчик
        next(error)
    }
}