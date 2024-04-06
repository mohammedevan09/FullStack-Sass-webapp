export const setRenewalDate = () => {
  const currentDate = new Date()
  const nextRenewalDate = new Date(currentDate)
  nextRenewalDate.setMonth(nextRenewalDate.getMonth() + 1)
  return nextRenewalDate.toISOString().split('T')[0]
}
