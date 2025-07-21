import { useQuery } from '@tanstack/react-query'
import DataGrid from '../components/data-display/DataGrid'
import type { Customer } from '../types/dto'
import { customersAPI } from '../api'
import { customerColumns } from '../lib/datagrid-columns/customerColumns'
import { useEffect } from 'react'
import { useGStore } from '../store/gStore'
import { useShallow } from 'zustand/shallow'

const CustomersPage = () => {
  const [customers, setCustomers] = useGStore(useShallow((s) => [s.customers, s.setCustomers]))

  const { data } = useQuery({
    queryKey: ['customers'],
    queryFn: customersAPI.getCustomers,
    initialData: [],
  })

  useEffect(() => {
    if (data) setCustomers(data)
  }, [data, setCustomers])

  return (
    <div>
      <DataGrid<Customer>
        data={customers}
        columns={customerColumns}
        drawer={<button className="btn btn-primary">Add Customer</button>}
      />
    </div>
  )
}

export default CustomersPage
