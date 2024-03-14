import Service from '../../model/serviceModels/serviceModal.js'

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find()
    return res.status(200).json(services)
  } catch (error) {
    next(error)
  }
}
