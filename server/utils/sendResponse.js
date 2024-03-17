export const sendResponse = (
  res,
  data,
  message = 'Not found',
  status = 404
) => {
  if (data) {
    return res.status(200).json(data)
  } else {
    return res.status(status).json({ message })
  }
}
