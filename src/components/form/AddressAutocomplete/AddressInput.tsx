import { useRef, type ChangeEvent, type KeyboardEvent } from 'react'
import { Icon } from '@iconify/react'

interface AddressInputProps {
  input: string
  placeholder: string
  disabled: boolean
  required: boolean
  hasError: boolean
  loading: boolean
  isExpanded: boolean
  activeIndex: number
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onClear: () => void
}

export const AddressInput = ({
  input,
  placeholder,
  disabled,
  required,
  hasError,
  loading,
  isExpanded,
  activeIndex,
  onInputChange,
  onKeyDown,
  onClear
}: AddressInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id="address-input"
        type="text"
        value={input}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`input input-bordered w-full pr-20 ${hasError ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}
        autoComplete="off"
        aria-expanded={isExpanded}
        aria-haspopup="listbox"
        aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        aria-describedby={hasError ? 'address-error' : undefined}
      />

      <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
        {loading && <span className="loading loading-spinner loading-sm" />}
        {input && !loading && (
          <button type="button" onClick={onClear} className="btn btn-ghost btn-xs btn-circle" aria-label="Clear address">
            <Icon icon="mdi:close" className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
