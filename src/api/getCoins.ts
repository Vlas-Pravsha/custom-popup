const apiUrl = 'https://api-eu.okotoki.com/coins'

async function getCoins() {
  try {
    const response = await fetch(apiUrl)
    return await response.json()
  } catch (e) {
    throw new Error('Failed to fetch data')
  }
}

export { getCoins }
