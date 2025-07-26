import { Icon } from '@iconify/react'
import type { AddressData } from '../../../types/dto'

interface AddressSuggestionsListProps {
  suggestions: AddressData[]
  activeIndex: number
  apiError: { message: string; type: string } | null
  onSuggestionClick: (suggestion: AddressData) => void
  onMouseEnter: (index: number) => void
  listRef: React.RefObject<HTMLUListElement | null>
}

export const AddressSuggestionsList = ({
  suggestions,
  activeIndex,
  apiError,
  onSuggestionClick,
  onMouseEnter,
  listRef
}: AddressSuggestionsListProps) => {
  if (apiError) {
    return (
      <div className="bg-base-100 border-base-300 absolute z-10 mt-1 w-full rounded-lg border shadow-lg">
        <div className="text-error flex items-center gap-2 p-4 text-sm">
          <Icon icon="mdi:alert-circle" className="h-4 w-4 flex-shrink-0" />
          {apiError.message}
        </div>
      </div>
    )
  }

  if (suggestions.length === 0) {
    return (
      <div className="bg-base-100 border-base-300 absolute z-10 mt-1 w-full rounded-lg border shadow-lg">
        <div className="text-base-content/60 p-4 text-sm">No addresses found</div>
      </div>
    )
  }

  return (
    <div className="bg-base-100 border-base-300 absolute z-10 mt-1 w-full rounded-lg border shadow-lg">
      <ul ref={listRef} className="menu max-h-60 overflow-y-auto" role="listbox" aria-label="Address suggestions">
        {suggestions.map((suggestion, index) => (
          <li
            key={suggestion.id || `${suggestion.title}-${index}`}
            role="option"
            aria-selected={index === activeIndex}
            id={`suggestion-${index}`}
          >
            <button
              type="button"
              className={`w-full text-left ${index === activeIndex ? 'active' : ''}`}
              onMouseDown={() => onSuggestionClick(suggestion)}
              onMouseEnter={() => onMouseEnter(index)}
            >
              <div className="flex items-center gap-2">
                <Icon icon="mdi:map-marker" className="text-base-content/60 h-4 w-4 flex-shrink-0" />
                <span className="truncate">{suggestion.address?.label || suggestion.title}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
