import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import userRouter from './router/userRouter.js'
import orderRouter from './router/orderRouter/orderRouter.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { stripeWebhook } from './controller/orderController/orderController.js'
import serviceRouter from './router/servicesRouter/serviceRoutes.js'
import normalServiceRoutes from './router/servicesRouter/normalServiceRoutes.js'
import subscriptionServiceRoutes from './router/servicesRouter/subscriptionServiceRoutes.js'
import hourlyServiceRoutes from './router/servicesRouter/hourlyServiceRoutes.js'
import formRouter from './router/formRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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
app.use('/api/service', serviceRouter)
app.use('/api/service/normalService', normalServiceRoutes)
app.use('/api/service/subscriptionService', subscriptionServiceRoutes)
app.use('/api/service/hourlyService', hourlyServiceRoutes)
app.use('/api/form', formRouter)
app.use('/api/order', orderRouter)

app.use(notFound)
app.use(errorHandler)

//connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected')
  })
  .catch((err) => {
    console.log('Disconnected', err)
  })

app.listen(port, () => {
  console.log('server listening at localhost:' + port)
})
