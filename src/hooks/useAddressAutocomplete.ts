import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { addressAPI } from '../api'
import { DEFAULT_LOCATIONS, ADDRESS_CONFIG } from '../lib/constants/address'
import type { AddressData } from '../types/dto'

interface AddressError {
  message: string
  type: 'network' | 'api' | 'validation'
}

interface UseAddressAutocompleteProps {
  regionCodes?: string[]
  debounceMs?: number
  defaultLocation?: { lat: number; lng: number }
  useOriginalSuggestionText?: boolean
  onSelect?: (address: string, details?: AddressData, originalSuggestion?: string) => void
  initialValue?: string
}

export const useAddressAutocomplete = ({
  regionCodes = ['AUS'],
  debounceMs = ADDRESS_CONFIG.DEFAULT_DEBOUNCE_MS,
  defaultLocation,
  useOriginalSuggestionText = false,
  onSelect,
  initialValue = ''
}: UseAddressAutocompleteProps) => {
  const [input, setInput] = useState(initialValue)
  const [suggestions, setSuggestions] = useState<AddressData[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [apiError, setApiError] = useState<AddressError | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  const debounceTimeout = useRef<number | null>(null)

  // Memoize the location to use
  const searchLocation = useMemo(() => {
    return defaultLocation || DEFAULT_LOCATIONS[regionCodes[0]] || DEFAULT_LOCATIONS.AUS
  }, [defaultLocation, regionCodes])

  // Cleanup debounce timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }
  }, [])

  const fetchSuggestions = useCallback(
    async (text: string) => {
      setActiveIndex(-1)
      setApiError(null)

      if (!text.trim()) {
        setSuggestions([])
        setIsExpanded(false)
        return
      }

      setLoading(true)
      setIsExpanded(true)

      try {
        const suggestions = await addressAPI.getSuggestions({
          query: text,
          location: searchLocation,
          regionCodes,
          limit: ADDRESS_CONFIG.DEFAULT_SUGGESTION_LIMIT
        })

        setSuggestions(suggestions)
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setApiError({
          message: 'Failed to load address suggestions',
          type: 'network'
        })
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    },
    [searchLocation, regionCodes]
  )

  const debouncedFetchSuggestions = useCallback(
    (text: string) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
      debounceTimeout.current = setTimeout(() => fetchSuggestions(text), debounceMs)
    },
    [debounceMs, fetchSuggestions]
  )

  const selectSuggestion = useCallback(
    async (suggestion: AddressData) => {
      const originalSuggestionText = suggestion.address?.label || suggestion.title
      setInput(originalSuggestionText)
      setSuggestions([])
      setActiveIndex(-1)
      setIsExpanded(false)
      setLoading(true)

      try {
        // Get detailed address information
        const details = await addressAPI.getDetails(suggestion.id, suggestion.address?.label)

        const formattedAddress = details.address?.label || details.title
        const addressToShow = useOriginalSuggestionText ? originalSuggestionText : formattedAddress

        setInput(addressToShow)
        onSelect?.(addressToShow, details, originalSuggestionText)
      } catch (error) {
        console.error('Error fetching place details:', error)
        onSelect?.(originalSuggestionText, suggestion, originalSuggestionText)
      } finally {
        setLoading(false)
      }
    },
    [useOriginalSuggestionText, onSelect]
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setInput(value)
      debouncedFetchSuggestions(value)
    },
    [debouncedFetchSuggestions]
  )

  const clearInput = useCallback(() => {
    setInput('')
    setSuggestions([])
    setActiveIndex(-1)
    setIsExpanded(false)
    setApiError(null)
  }, [])

  const setActiveItem = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return {
    // State
    input,
    suggestions,
    loading,
    activeIndex,
    apiError,
    isExpanded,

    // Actions
    handleInputChange,
    selectSuggestion,
    clearInput,
    setActiveItem,
    setIsExpanded,

    // Computed
    hasError: Boolean(apiError),
    showSuggestions: isExpanded && (suggestions.length > 0 || apiError)
  }
}
