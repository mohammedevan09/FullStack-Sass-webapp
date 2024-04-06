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

const formattedDate = formatDate('2024-04-04T08:56:45.517Z')
