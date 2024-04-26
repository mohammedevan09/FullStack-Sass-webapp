export function formatDate(dateString) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  }

  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString('en-GB', options)

  return formattedDate
}

export function formatDateTwo(dateString) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  const date = new Date(dateString)
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // Handle midnight (0 hours)

  const formattedDate = `${day} ${months[monthIndex]} ${year} ${hours}:${minutes
    .toString()
    .padStart(2, '0')} ${ampm}`

  return formattedDate
}

export const formatChatDateAndTime = (dateString) => {
  const date = new Date(dateString)

  // Get components of the date
  const year = date.getFullYear()
  const month = date.getMonth() // Months are zero-indexed (0 = January)
  const day = date.getDate()
  const hours = date.getHours() % 12 || 12 // Convert to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

  // Calculate time difference for relative formatting (Today, Yesterday)
  const today = new Date()
  const yesterday = new Date(today.getTime() - 1000 * 60 * 60 * 24)
  const diffInDays = Math.floor((today - date) / (1000 * 60 * 60 * 24))

  // Format the date based on the difference
  let formattedDate
  if (diffInDays === 0) {
    formattedDate = 'Today'
  } else if (diffInDays === 1) {
    formattedDate = 'Yesterday'
  } else if (diffInDays <= 3) {
    formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
    }).format(date)
  } else if (month === today.getMonth() && year === today.getFullYear()) {
    formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
    }).format(date)
  } else {
    formattedDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  return `${hours
    .toString()
    .padStart(2, '0')}:${minutes} ${ampm}, ${formattedDate}`
}
