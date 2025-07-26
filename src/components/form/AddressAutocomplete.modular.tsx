import { useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete'
import { AddressInput } from './AddressAutocomplete/AddressInput'
import { AddressSuggestionsList } from './AddressAutocomplete/AddressSuggestionsList'
import type { AddressData } from '../../types/dto'

interface AddressAutocompleteProps {
  onSelect?: (address: string, details?: AddressData, originalSuggestion?: string) => void
  regionCodes?: string[]
  placeholder?: string
  label?: string
  className?: string
  debounceMs?: number
  initialValue?: string
  useOriginalSuggestionText?: boolean
  defaultLocation?: { lat: number; lng: number }
  required?: boolean
  disabled?: boolean
  error?: string
  onClear?: () => void
}

const AddressAutocomplete = ({
  onSelect,
  regionCodes = ['AUS'],
  placeholder = 'Start typing an address...',
  label = 'Find an Address',
  className = '',
  debounceMs = 300,
  initialValue = '',
  useOriginalSuggestionText = false,
  defaultLocation,
  required = false,
  disabled = false,
  error,
  onClear
}: AddressAutocompleteProps) => {
  const listRef = useRef<HTMLUListElement>(null)

  const {
    input,
    suggestions,
    loading,
    activeIndex,
    apiError,
    isExpanded,
    handleInputChange,
    selectSuggestion,
    clearInput,
    setActiveItem,
    showSuggestions
  } = useAddressAutocomplete({
    regionCodes,
    debounceMs,
    defaultLocation,
    useOriginalSuggestionText,
    onSelect,
    initialValue
  })

  const scrollToActiveItem = (index: number) => {
    const listElement = listRef.current
    const activeItem = listElement?.children[index] as HTMLElement

    if (activeItem && listElement) {
      const listRect = listElement.getBoundingClientRect()
      const itemRect = activeItem.getBoundingClientRect()

      if (itemRect.bottom > listRect.bottom) {
        activeItem.scrollIntoView({ block: 'end', behavior: 'smooth' })
      } else if (itemRect.top < listRect.top) {
        activeItem.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isExpanded || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault()
        const nextIndex = activeIndex < suggestions.length - 1 ? activeIndex + 1 : 0
        setActiveItem(nextIndex)
        scrollToActiveItem(nextIndex)
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const prevIndex = activeIndex > 0 ? activeIndex - 1 : suggestions.length - 1
        setActiveItem(prevIndex)
        scrollToActiveItem(prevIndex)
        break
      }
      case 'Enter': {
        e.preventDefault()
        if (activeIndex >= 0 && suggestions[activeIndex]) {
          selectSuggestion(suggestions[activeIndex])
        }
        break
      }
      case 'Escape': {
        clearInput()
        break
      }
      default:
        break
    }
  }

  const handleInputChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value)
  }

  const handleClear = () => {
    clearInput()
    onClear?.()
  }

  const displayError = error || apiError

  return (
    <div className={`w-full max-w-lg ${className}`}>
      <div className="relative">
        <label htmlFor="address-input" className="label mb-0.5">
          <span className="label-text">
            {label}
            {required && <span className="text-error ml-1">*</span>}
            {regionCodes.length === 1 ? ` (${regionCodes[0]})` : ''}
          </span>
        </label>

        <AddressInput
          input={input}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          hasError={Boolean(displayError)}
          loading={loading}
          isExpanded={isExpanded}
          activeIndex={activeIndex}
          onInputChange={handleInputChangeWrapper}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
        />

        {showSuggestions && (
          <AddressSuggestionsList
            suggestions={suggestions}
            activeIndex={activeIndex}
            apiError={apiError}
            onSuggestionClick={selectSuggestion}
            onMouseEnter={setActiveItem}
            listRef={listRef}
          />
        )}

        {displayError && (
          <div id="address-error" className="label">
            <span className="label-text-alt text-error">{error || apiError?.message}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddressAutocomplete
export type { AddressAutocompleteProps }
