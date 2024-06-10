export const generateCustomDate = () => {
  const date = new Date()
  const isoString = date.toISOString()
  const formattedDate = isoString.replace('Z', '+00:00')
  return formattedDate
}
