import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import userRouter from './router/userRouter.js'
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
