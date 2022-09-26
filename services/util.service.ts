export const utilService = { formatDate }

function formatDate(timestamp: EpochTimeStamp) {
  const givenDate = new Date(timestamp)
  const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const daysAgo = new Date(Date.now() - timestamp).getDate()

  if (daysAgo > 2) return givenDate.toLocaleDateString('en-US')

  const relativeDays = formatter.format(
    givenDate.getDay() - new Date().getDay(),
    'day'
  )

  const atHour = givenDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return `${
    relativeDays[0].toUpperCase() + relativeDays.substring(1)
  } at ${atHour}`
}
