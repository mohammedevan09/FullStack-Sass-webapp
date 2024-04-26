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

dotenv.config()

const app = express()
const port = process.env.PORT
const allowedOrigins = JSON.parse(process.env.CLIENT_URL)

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
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
app.use('/api/feedbackCategory', feedbackCategoryRouter)
app.use('/api/feedback', feedbackRouter)
app.use('/api/affiliate', affiliateRouter)
app.use('/api/userSetting', userSettingRouter)

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
global.onlineUsers = new Map()

io.on('connection', (socket) => {
  global.chatSocket = socket
  socket.on('add-user', (data) => {
    onlineUsers.set(`${data?.userId}-${data?.orderId}`, socket.id)
    socket.broadcast.emit('online-users', {
      onlineUsers: Array.from(onlineUsers.keys()),
    })
  })

  socket.on('sendMessage', (message) => {
    let sendUserSocket = onlineUsers.get(
      `${message?.receiver}-${message?.orderId}`
    )

    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('message', message)
    }
  })

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })
})

httpServer.listen(port, () => {
  console.log('server listening at localhost:' + port)
})
