export function extractMonthAndDay(dateString: string): string {
  const date = new Date(dateString)

  // Check if the date is valid
  if (Number.isNaN(date.getTime()))
    throw new Error('Invalid date string')

  // Get month and day
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')

  return `${month}-${day}`
}
