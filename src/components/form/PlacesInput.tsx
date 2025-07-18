import { useRef, useEffect, type InputHTMLAttributes } from 'react'

declare global {
  interface Window {
    google: any
  }
}

interface PlacesInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string
  value: string
  onChange: (value: string) => void
}

const PlacesInput: React.FC<PlacesInputProps> = ({ label, value, onChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<any>(null)

  useEffect(() => {
    if (window.google && window.google.maps && inputRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode'],
        componentRestrictions: { country: 'us' }, // Example restriction
      })

      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current.getPlace()
        if (place && place.formatted_address) {
          onChange(place.formatted_address)
        }
      })
    }

    // Cleanup listener on unmount
    return () => {
      if (autocompleteRef.current) {
        // The maps event object may not exist if the API failed to load
        if (window.google && window.google.maps && window.google.maps.event) {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current)
        }
      }
    }
  }, [onChange])

  return (
    <div className="form-control">
      <label className="label" htmlFor={props.id}>
        <span className="label-text">{label}</span>
      </label>
      <input
        ref={inputRef}
        type="text"
        className="input input-bordered w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  )
}

export default PlacesInput
