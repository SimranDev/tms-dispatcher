import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import mapboxgl from 'mapbox-gl'
import { Icon } from '@iconify/react'
import { useGStore } from '../store/gStore'
import { jobsAPI } from '../api'
import { JobStatus } from '../types/dto/enums'
import { CONFIG } from '../lib/constants'
import type { Job } from '../types/dto'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const LiveTrackingPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<mapboxgl.Marker[]>([])

  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeJobs, setActiveJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const { jobs, setJobs } = useGStore()

  // Fetch jobs data
  const { data } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsAPI.getJobs,
    initialData: jobs,
  })

  useEffect(() => {
    if (data) {
      setJobs(data)
      const inProgressJobs = data.filter((job) => job.status === JobStatus.InProgress)
      setActiveJobs(inProgressJobs)
      setSelectedJob(inProgressJobs.length > 0 ? inProgressJobs[0] : null)
    }
  }, [data, setJobs])

  // Initialize map
  useEffect(() => {
    if (map.current || !mapContainer.current) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [144.9631, -37.8136], // Melbourne
        zoom: 10,
      })

      // Set map loaded state when map is ready
      map.current.on('load', () => {
        setMapLoaded(true)
      })
    } catch (error) {
      console.error('Error initializing map:', error)
    }

    return () => {
      if (map.current) {
        // Clean up markers
        markersRef.current.forEach((marker) => marker.remove())
        markersRef.current = []

        map.current.remove()
        map.current = null
        setMapLoaded(false)
      }
    }
  }, [])

  // Center map and show route for selected job
  useEffect(() => {
    if (!map.current || !mapLoaded || !selectedJob) return

    const { pickupLatitude, pickupLongitude, deliveryLatitude, deliveryLongitude } = selectedJob

    // Validate coordinates
    if (!pickupLatitude || !pickupLongitude || !deliveryLatitude || !deliveryLongitude) {
      console.warn('Invalid coordinates for job:', selectedJob.id)
      return
    }

    // Clear existing markers and sources
    try {
      // Remove existing markers
      markersRef.current.forEach((marker) => marker.remove())
      markersRef.current = []

      // Remove existing route source and layer
      if (map.current!.getSource('route')) {
        map.current!.removeLayer('route')
        map.current!.removeSource('route')
      }
    } catch (error) {
      console.warn('Error clearing existing map elements:', error)
    }

    // Add pickup marker
    const pickupMarker = new mapboxgl.Marker({
      color: '#22c55e', // green
      scale: 1.2,
    })
      .setLngLat([pickupLongitude, pickupLatitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-green-700">Pickup Location</h3>
              <p class="text-sm">${selectedJob.pickupAddress}</p>
            </div>
          `)
      )
      .addTo(map.current)

    // Add delivery marker
    const deliveryMarker = new mapboxgl.Marker({
      color: '#ef4444', // red
      scale: 1.2,
    })
      .setLngLat([deliveryLongitude, deliveryLatitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-semibold text-red-700">Delivery Location</h3>
              <p class="text-sm">${selectedJob.deliveryAddress}</p>
            </div>
          `)
      )
      .addTo(map.current)

    // Store markers for cleanup
    markersRef.current = [pickupMarker, deliveryMarker]

    // Fetch and display route
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLongitude},${pickupLatitude};${deliveryLongitude},${deliveryLatitude}?geometries=geojson&overview=full&access_token=${mapboxgl.accessToken}`
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0]

          // Add route to map
          map.current!.addSource('route', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: route.geometry,
            },
          })

          map.current!.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
              'line-join': 'round',
              'line-cap': 'round',
            },
            paint: {
              'line-color': '#2563eb', // blue
              'line-width': 4,
              'line-opacity': 0.8,
            },
          })
        }
      } catch (error) {
        console.error('Error fetching route:', error)

        // Fallback: draw straight line between points
        map.current!.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [pickupLongitude, pickupLatitude],
                [deliveryLongitude, deliveryLatitude],
              ],
            },
          },
        })

        map.current!.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#94a3b8', // gray
            'line-width': 2,
            'line-dasharray': [2, 2],
          },
        })
      }
    }

    // Fit map to show both pickup and delivery points
    const bounds = new mapboxgl.LngLatBounds()
    bounds.extend([pickupLongitude, pickupLatitude])
    bounds.extend([deliveryLongitude, deliveryLatitude])

    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15,
    })

    // Fetch route after a short delay to ensure map has adjusted
    setTimeout(fetchRoute, 500)
  }, [selectedJob, mapLoaded])

  return (
    <div className="flex flex-col" style={{ height: `calc(100vh - ${CONFIG.headerHeight}px)` }}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 border-b border-slate-300 px-4 py-2" style={{ height: CONFIG.headerHeight }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="stat-title">ACTIVE JOBS</div>
            <div className="stat-value text-primary text-2xl">{activeJobs.length}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Scrollable Section */}
        <div className="bg-base-100 w-1/3 border-r border-slate-300 shadow-sm">
          <div className="h-full overflow-y-auto">
            {activeJobs.length === 0 ? (
              <div className="text-base-content/60 p-8 text-center">
                <div className="bg-base-200 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <Icon icon="mdi:map-marker-off" className="text-3xl" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">No Active Jobs</h3>
                <p className="text-sm">Jobs will appear here when they're in progress</p>
              </div>
            ) : (
              <div>
                {activeJobs.map((job) => (
                  <div
                    key={job.id}
                    className={`group hover:border-primary/20 relative cursor-pointer overflow-hidden border border-slate-200 transition-all duration-200 ${
                      selectedJob?.id === job.id ? 'ring-primary/20 border-primary bg-primary/5' : 'hover:bg-slate-50'
                    }`}
                    onClick={() => setSelectedJob(job)}
                  >
                    {/* Header with customer and status */}
                    <div
                      className={`mb-3 flex items-start justify-between px-4 pt-3 pb-2 ${selectedJob?.id === job.id ? 'bg-primary text-white' : ''}`}
                    >
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-base font-semibold">{job.customer?.companyName || 'Unknown Customer'}</h3>
                        <span
                          className={`font-mono font-black ${selectedJob?.id === job.id ? 'text-emerald-50' : 'text-accent'}`}
                        >
                          #{job.id}
                        </span>
                      </div>
                      <div className="ml-2 flex-shrink-0">
                        <Icon icon="mdi:truck" width={20} />
                      </div>
                    </div>

                    {/* Route Information */}
                    <div className="space-y-2 px-4 pb-2">
                      <div className="flex gap-3 truncate">
                        <div className="mt-1 flex flex-col items-center">
                          <Icon icon="mdi:map-marker" className="text-slate-500" />
                          <div className="h-4 w-px bg-slate-300"></div>
                          <Icon icon="mdi:map-marker-check" className="text-slate-500" />
                        </div>
                        <div className="flex flex-col">
                          <p className="w-80 truncate text-sm text-slate-600">{job.pickupAddress}</p>
                          <div className="flex-1" />
                          <p className="text-sm leading-snug text-slate-600">{job.deliveryAddress}</p>
                        </div>
                      </div>
                    </div>

                    {/* Driver and Vehicle Info */}
                    <div className="px-4">
                      {(job.driver || job.vehicle) && (
                        <div className="mt-3 border-t border-slate-100 pt-3 pb-6">
                          <div className="flex items-center justify-between text-xs">
                            {job.driver && (
                              <div className="flex items-center gap-1">
                                <Icon icon="mdi:account" className="text-slate-400" />
                                <span className="font-medium text-slate-600">
                                  {job.driver.firstname} {job.driver.lastname}
                                </span>
                              </div>
                            )}
                            {job.vehicle && (
                              <div className="flex items-center gap-1">
                                <Icon icon="mdi:truck-outline" className="text-slate-400" />
                                <span className="font-medium text-slate-600">{job.vehicle.name}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Selection indicator */}
                    {selectedJob?.id === job.id && <div className="bg-primary absolute top-0 bottom-0 left-0 w-0.5"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Map Section */}
        <div className="relative flex-1">
          {!mapLoaded && (
            <div className="bg-base-200 absolute inset-0 z-10 flex items-center justify-center">
              <div className="text-center">
                <div className="loading loading-spinner loading-lg mb-4"></div>
                <p className="text-base-content/60">Loading map...</p>
                {!import.meta.env.VITE_MAPBOX_ACCESS_TOKEN && (
                  <p className="text-warning mt-2 text-sm">
                    ⚠️ Mapbox token not configured. Add VITE_MAPBOX_ACCESS_TOKEN to your .env file.
                  </p>
                )}
              </div>
            </div>
          )}
          <div ref={mapContainer} className="h-full w-full" />
        </div>
      </div>
    </div>
  )
}

export default LiveTrackingPage
