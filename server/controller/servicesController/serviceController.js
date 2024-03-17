import Service from '../../model/serviceModels/serviceModel.js'

export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find().sort('__t')
    return res.status(200).json(services)
  } catch (error) {
    next(error)
  }
}
