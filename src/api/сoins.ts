const apiUrl = import.meta.env.VITE_API_URL

async function getCoins(): Promise<Item[]> {
  if (!apiUrl) {
    throw new Error('API URL is not defined')
  }

  try {
    const response = await fetch(apiUrl)
    return await response.json()
  } catch (e) {
    throw new Error('Failed to fetch data')
  }
}

export { getCoins }
