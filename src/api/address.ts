import axios from 'axios'
import type { AddressData } from '../types/dto'

const API_KEY = import.meta.env.VITE_HERE_MAP_API_KEY
const HERE_AUTOCOMPLETE_ENDPOINT = 'https://autosuggest.search.hereapi.com/v1/autosuggest'
const HERE_GEOCODE_ENDPOINT = 'https://geocode.search.hereapi.com/v1/geocode'

interface AddressSuggestionParams {
  query: string
  location: { lat: number; lng: number }
  regionCodes: string[]
  limit?: number
}

export const addressAPI = {
  getSuggestions: async ({ query, location, regionCodes, limit = 5 }: AddressSuggestionParams): Promise<AddressData[]> => {
    const response = await axios.get(HERE_AUTOCOMPLETE_ENDPOINT, {
      params: {
        apikey: API_KEY,
        q: query,
        limit,
        at: `${location.lat},${location.lng}`,
        in: `countryCode:${regionCodes.join(',')}`
      }
    })
    return response.data.items || []
  },

  getDetails: async (suggestionId: string, addressLabel?: string): Promise<AddressData> => {
    try {
      if (addressLabel) {
        const geocodeResponse = await axios.get(HERE_GEOCODE_ENDPOINT, {
          params: {
            apikey: API_KEY,
            q: addressLabel,
            limit: 1
          }
        })

        if (geocodeResponse.data.items && geocodeResponse.data.items.length > 0) {
          const geocodedResult = geocodeResponse.data.items[0]
          return {
            id: suggestionId,
            title: addressLabel,
            address: {
              label: addressLabel,
              countryCode: geocodedResult.address?.countryCode,
              countryName: geocodedResult.address?.countryName,
              stateCode: geocodedResult.address?.stateCode,
              state: geocodedResult.address?.state,
              city: geocodedResult.address?.city,
              district: geocodedResult.address?.district,
              street: geocodedResult.address?.street,
              houseNumber: geocodedResult.address?.houseNumber,
              postalCode: geocodedResult.address?.postalCode
            },
            position: geocodedResult.position
          }
        }
      }

      // Fallback to lookup endpoint if available
      throw new Error('Address details not found')
    } catch (error) {
      console.warn('Forward geocoding failed:', error)
      throw error
    }
  }
}
