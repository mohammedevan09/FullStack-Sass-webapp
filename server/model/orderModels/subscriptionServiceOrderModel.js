import mongoose from 'mongoose'
import Order from '../orderModal.js'

const maintenanceSchema = new mongoose.Schema({
  subscriptionRenew: {
    type: String,
  },
})

const Maintenance = Order.discriminator('Maintenance', maintenanceSchema)
export default Maintenance
