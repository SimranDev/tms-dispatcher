// src/components/AddressAutocomplete.jsx

import { useState, useRef, useCallback, type ChangeEvent, type KeyboardEvent } from 'react'
import axios from 'axios'

interface PlaceSuggestion {
  placePrediction: {
    placeId: string
    text: {
      text: string
    }
  }
}

interface PlaceDetails {
  formattedAddress: string
  location?: {
    latitude: number
    longitude: number
  }
}

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY
const PLACES_API_ENDPOINT = 'https://places.googleapis.com/v1/places:autocomplete'

interface AddressAutocompleteProps {
  onSelect?: (address: string, details?: PlaceDetails) => void
  regionCodes?: string[]
  placeholder?: string
  label?: string
  className?: string
  debounceMs?: number
  initialValue?: string
}

const AddressAutocomplete = ({
  onSelect,
  regionCodes = ['AU'],
  placeholder = 'Start typing an address...',
  label = 'Find an Address',
  className = '',
  debounceMs = 300,
  initialValue = '',
}: AddressAutocompleteProps) => {
  const [input, setInput] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const debounceTimeout = useRef<number | null>(null)

  const fetchSuggestions = useCallback(
    async (text: string) => {
      setActiveIndex(-1)
      if (!text) {
        setSuggestions([])
        return
      }
      setLoading(true)
      try {
        const response = await axios.post(
          PLACES_API_ENDPOINT,
          {
            input: text,
            includedRegionCodes: regionCodes,
          },
          { headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': API_KEY } }
        )
        setSuggestions(response.data.suggestions || [])
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    },
    [regionCodes]
  )

  const debouncedFetchSuggestions = useCallback(
    (text: string) => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
      debounceTimeout.current = setTimeout(() => fetchSuggestions(text), debounceMs)
    },
    [debounceMs, fetchSuggestions]
  )

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    debouncedFetchSuggestions(e.target.value)
  }

  const handleSuggestionClick = async (suggestion: PlaceSuggestion) => {
    const placeId = suggestion.placePrediction.placeId
    setInput(suggestion.placePrediction.text.text)
    setSuggestions([])
    setActiveIndex(-1)
    setLoading(true)

    try {
      const response = await axios.get<PlaceDetails>(`https://places.googleapis.com/v1/places/${placeId}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'formattedAddress,location',
        },
      })
      if (response.data.formattedAddress) {
        setInput(response.data.formattedAddress)
        if (onSelect) onSelect(response.data.formattedAddress, response.data)
      } else {
        if (onSelect) onSelect(suggestion.placePrediction.text.text)
      }
    } catch (error) {
      console.error('Error fetching place details:', error)
      if (onSelect) onSelect(suggestion.placePrediction.text.text)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % suggestions.length)
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length)
        break
      }
      case 'Enter': {
        e.preventDefault()
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          handleSuggestionClick(suggestions[activeIndex])
        }
        break
      }
      case 'Escape': {
        setSuggestions([])
        setActiveIndex(-1)
        break
      }
      default:
        break
    }
  }

  return (
    <div className={`w-full max-w-lg ${className}`}>
      <div className="relative">
        <label htmlFor="address-input" className="label mb-0.5">
          <span className="label-text">
            {label}
            {regionCodes.length === 1 ? ` (${regionCodes[0]})` : ''}
          </span>
        </label>

        <div className="relative">
          <input
            id="address-input"
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="input input-bordered w-full pr-10" // add padding-right for spinner space
            autoComplete="off"
          />

          {loading && <span className="loading loading-spinner loading-sm absolute top-1/2 right-3 -translate-y-1/2"></span>}
        </div>

        {suggestions.length > 0 && (
          <ul className="menu bg-base-100 absolute z-10 mt-1 w-full rounded-lg shadow-lg" role="listbox">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.placePrediction.placeId}
                role="option"
                aria-selected={index === activeIndex}
                className={`cursor-pointer px-4 py-2 ${index === activeIndex ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.placePrediction.text.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default AddressAutocomplete
