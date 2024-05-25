import { createServer } from 'http'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { Server } from 'socket.io'

import userRouter from './router/userRouter/userRouter.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import serviceRouter from './router/servicesRouter/serviceRoutes.js'
import normalServiceRoutes from './router/servicesRouter/normalServiceRoutes.js'
import subscriptionServiceRoutes from './router/servicesRouter/subscriptionServiceRoutes.js'
import hourlyServiceRoutes from './router/servicesRouter/hourlyServiceRoutes.js'
import formCategory from './router/formRouter/formCategoryRouter.js'
import formRouter from './router/formRouter/formRouter.js'
import { stripeWebhook } from './controller/stripeWebhook.js'
import orderRouter from './router/orderRouter/orderRouter.js'
import normalServiceOrderRouter from './router/orderRouter/normalServiceOrderRouter.js'
import subscriptionServiceOrderRouter from './router/orderRouter/subscriptionServiceOrderRouter.js'
import hourlyServiceOrderRouter from './router/orderRouter/hourlyServiceOrderRouter.js'
import orderChatRouter from './router/orderRouter/orderChatRouter.js'
import guideRouter from './router/guideRouter.js'
import feedbackCategoryRouter from './router/feedbackRouter/feedbackCategoryRouter.js'
import feedbackRouter from './router/feedbackRouter/feedbackRouter.js'
import affiliateRouter from './router/affiliateRouter.js'
import userSettingRouter from './router/userRouter/userSettingRouter.js'
import teamRouter from './router/userRouter/teamRouter.js'
import ticketRouter from './router/ticketRouter/ticketRouter.js'
import ticketChatRouter from './router/ticketRouter/ticketChatRouter.js'
import proposalRouter from './router/proposalRouter/proposalRouter.js'
import proposalChatRouter from './router/proposalRouter/proposalChatRouter.js'
import notificationRouter from './router/notificationRouter/notificationRouter.js'
import messageNotificationRouter from './router/notificationRouter/messageNotificationRouter.js'
import dashboardRouter from './router/dashboardRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT
const allowedOrigins = JSON.parse(process.env.CLIENT_URL)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
  })
)
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res, next) => {
  try {
    return res.send('Api test successful!')
  } catch (error) {
    next(error)
  }
})

app.post(
  '/api/order/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
)

app.use(express.json())
app.use('/api/dashboard', dashboardRouter)
app.use('/api/user', userRouter)
app.use('/api/services', serviceRouter)
app.use('/api/services/normalService', normalServiceRoutes)
app.use('/api/services/subscriptionService', subscriptionServiceRoutes)
app.use('/api/services/hourlyService', hourlyServiceRoutes)
app.use('/api/formCategory', formCategory)
app.use('/api/form', formRouter)
app.use('/api/order', orderRouter)
app.use('/api/order/normalService', normalServiceOrderRouter)
app.use('/api/order/subscriptionService', subscriptionServiceOrderRouter)
app.use('/api/order/hourlyService', hourlyServiceOrderRouter)
app.use('/api/order/chat', orderChatRouter)
app.use('/api/guide', guideRouter)
app.use('/api/ticket', ticketRouter)
app.use('/api/ticket/chat', ticketChatRouter)
app.use('/api/proposal', proposalRouter)
app.use('/api/proposal/chat', proposalChatRouter)
app.use('/api/feedbackCategory', feedbackCategoryRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/affiliate', affiliateRouter)
app.use('/api/userSetting', userSettingRouter)
app.use('/api/team', teamRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/messageNotification', messageNotificationRouter)

app.use(notFound)
app.use(errorHandler)

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
})

//connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected')
  })
  .catch((err) => {
    console.log('Disconnected', err)
  })

// Socket
global.online = new Map()
global.onlineUsers = new Map()

io.on('connection', (socket) => {
  global.chatSocket = socket

  socket.on('add-user', (data) => {
    if (data?.id) {
      online.set(`${data?.userId}-${data?.id}`, socket.id)
    }
    onlineUsers.set(data?.userId, socket.id)
    socket.broadcast.emit('online-users', {
      onlineUsers: Array.from(onlineUsers.keys()),
    })
  })

  socket.on('sendMessage', (message) => {
    message.receiver.forEach((receiverId) => {
      let sendUserSocket = online.get(`${receiverId}-${message?.id}`)
      let sendOnlineUserSocket = onlineUsers.get(receiverId)

      if (sendUserSocket) {
        socket.to(sendUserSocket).emit('message', message)
      }
      if (sendOnlineUserSocket) {
        socket.to(sendOnlineUserSocket).emit('messageNotification', message)
      }
    })
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)

    online.forEach((value, key) => {
      if (value === socket.id) {
        online.delete(key)
      }
    })

    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key)
      }
    })

    socket.broadcast.emit('online-users', {
      onlineUsers: Array.from(onlineUsers.keys()),
    })
  })
})

httpServer.listen(port, () => {
  console.log('server listening at localhost:' + port)
})
