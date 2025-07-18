import { useQuery } from '@tanstack/react-query'
import { DataGrid } from '../components/data-display/DataGrid'
import { driversAPI } from '../api'
import type { Driver } from '../types/components'
import { driverColumns } from '../components/data-display/datagrid-columns/DriverColumns'

const DriversPage = () => {
  const { data } = useQuery({
    queryKey: ['drivers'],
    queryFn: driversAPI.getDrivers,
    initialData: [],
  })

  return (
    <div>
      <DataGrid<Driver> data={data} columns={driverColumns} drawer={<button className="btn btn-primary">Add Driver</button>} />
    </div>
  )
}

export default DriversPage
