// Импорт всех функций из сервиса для работы с сообщениями
import * as messageService from '../services/messageService.js'

// Получить все сообщения конкретной комнаты
export async function getMessages(req, res, next) {
    try {
        const messages = await messageService.getMessages(req.params.id)
        res.status(200).json({ messages })
    } catch (error) {
        next(error)
    }
}

// Отправить новое сообщение в комнату
export async function createMessage(req, res, next) {
    try {
        const message = await messageService.createMessage(
            req.params.id,      // roomId
            req.user.sub,       // supabaseId пользователя
            req.body.content    // текст сообщения
        )
        res.status(201).json({ message })
    } catch (error) {
        next(error)
    }
}