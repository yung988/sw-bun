// CSV Parser functions
function parseCSV(text) {
  const lines = text.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/\r/g, ''))
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    const obj = {}
    headers.forEach((header, index) => {
      obj[header] = values[index] ? values[index].trim().replace(/\r/g, '') : ''
    })
    data.push(obj)
  }

  return data
}

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  result.push(current)

  return result.map(v => v.replace(/^"|"$/g, ''))
}

// Helper function to get image URL
export function getImageUrl(imagePath) {
  if (!imagePath) return ''

  // Return URL directly if it's already a full URL (from Blob)
  if (imagePath.startsWith('http')) {
    return imagePath
  }

  // Fallback: try local path
  return `/images/${imagePath}`
}

// Global data storage
export let servicesData = []
export let pricesData = []

// Load CSV data
export async function loadServicesData() {
  try {
    // Load services.csv
    const servicesResponse = await fetch('/services.csv')
    const servicesText = await servicesResponse.text()
    servicesData = parseCSV(servicesText)

    // Load prices.csv
    const pricesResponse = await fetch('/prices.csv')
    const pricesText = await pricesResponse.text()
    pricesData = parseCSV(pricesText)

    console.log('CSV data loaded:', { servicesData, pricesData })

    return { servicesData, pricesData }
  } catch (error) {
    console.error('Error loading CSV data:', error)
    return { servicesData: [], pricesData: [] }
  }
}

// Export servicesData and pricesData as getters
export function getServicesData() {
  return servicesData
}

export function getPricesData() {
  return pricesData
}
