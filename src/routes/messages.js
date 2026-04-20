// Импорт Router из Express для создания модульных маршрутов
import { Router } from 'express'
// Импорт всех функций контроллера для работы с сообщениями
import * as messageController from '../controllers/messageController.js'
// Импорт middleware для проверки JWT токена
import authenticate from '../middleware/authenticate.js'
// Импорт универсальной функции валидации
import { validate } from '../validators/auth.js'
// Импорт схемы валидации для создания сообщения
import { createMessageSchema } from '../validators/message.js'

const router = Router()

// GET /rooms/:id/messages - получить все сообщения комнаты
router.get('/:id/messages', authenticate, messageController.getMessages)
// POST /rooms/:id/messages - отправить новое сообщение в комнату
router.post('/:id/messages', authenticate, validate(createMessageSchema), messageController.createMessage)

export default router