import { useQuery } from '@tanstack/react-query'
import { DataGrid } from '../components/data-display/DataGrid'
import { driversAPI } from '../api'
import type { Driver } from '../types/dto'
import { driverColumns } from '../lib/datagrid-columns/DriverColumns'
import { useGStore } from '../store/gStore'
import { useShallow } from 'zustand/shallow'
import { useEffect } from 'react'

const DriversPage = () => {
  const [drivers, setDrivers] = useGStore(useShallow((s) => [s.drivers, s.setDrivers]))

  const { data } = useQuery({
    queryKey: ['drivers'],
    queryFn: driversAPI.getDrivers,
    initialData: [],
  })

  useEffect(() => {
    if (data) setDrivers(data)
  }, [data, setDrivers])

  return (
    <div>
      <DataGrid<Driver> data={drivers} columns={driverColumns} drawer={<button className="btn btn-primary">Add Driver</button>} />
    </div>
  )
}

export default DriversPage
