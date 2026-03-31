/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const getLocation = {
  getCountries: async () => {
    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    const json = await response.json()

    const countriesArray = json?.data || json?.countries || []

    if (!Array.isArray(countriesArray)) return []

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return countriesArray.map((c: any) => ({
      label: c.country,
      value: c.country
    }))
  },

  getCities: async (country: string) => {
    if (!country) return []

    const response = await fetch(
      'https://countriesnow.space/api/v0.1/countries/cities',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ country })
      }
    )

    const data = await response.json()

    return (data.data || []).map((city: string) => ({
      label: city,
      value: city
    }))
  }
}
