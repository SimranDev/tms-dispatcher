import { useQuery } from '@tanstack/react-query'
import { vehiclesAPI } from '../api'
import DataGrid from '../components/data-display/DataGrid'
import type { Vehicle } from '../types/dto'
import { vehicleColumns } from '../lib/datagrid-columns/vehicleColumns'
import { useGStore } from '../store/gStore'
import { useShallow } from 'zustand/shallow'
import { useEffect } from 'react'

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useGStore(useShallow((s) => [s.vehicles, s.setVehicles]))

  const { data } = useQuery({
    queryKey: ['vehicles'],
    queryFn: vehiclesAPI.getVehicles,
    initialData: [],
  })

  useEffect(() => {
    if (data) setVehicles(data)
  }, [data, setVehicles])

  return (
    <div>
      <DataGrid<Vehicle>
        data={vehicles}
        columns={vehicleColumns}
        drawer={<button className="btn btn-primary">Add Vehicle</button>}
      />
    </div>
  )
}

export default VehiclesPage
