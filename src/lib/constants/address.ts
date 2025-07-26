export const DEFAULT_LOCATIONS: Record<string, { lat: number; lng: number }> = {
  AUS: { lat: -25.2744, lng: 133.7751 },
  AU: { lat: -25.2744, lng: 133.7751 },
  NZ: { lat: -40.9006, lng: 174.886 },
  NZL: { lat: -40.9006, lng: 174.886 },
  US: { lat: 39.8283, lng: -98.5795 },
  USA: { lat: 39.8283, lng: -98.5795 },
  GB: { lat: 55.3781, lng: -3.436 },
  UK: { lat: 55.3781, lng: -3.436 }
} as const

export const ADDRESS_CONFIG = {
  DEFAULT_DEBOUNCE_MS: 300,
  DEFAULT_SUGGESTION_LIMIT: 5,
  MAX_DROPDOWN_HEIGHT: 'max-h-60'
} as const
