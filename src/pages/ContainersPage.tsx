import { useShallow } from 'zustand/shallow'
import { useGStore } from '../store/gStore'
import { useQuery } from '@tanstack/react-query'
import { containersAPI } from '../api'
import { useEffect } from 'react'
import DataGrid from '../components/data-display/DataGrid'
import type { Container } from '../types/dto'
import { containerColumns } from '../lib/datagrid-columns/containerColumns'

const ContainersPage = () => {
  const [containers, setContainers] = useGStore(useShallow((s) => [s.containers, s.setContainers]))

  const { data } = useQuery({
    queryKey: ['containers'],
    queryFn: containersAPI.getContainers,
    initialData: [],
  })

  useEffect(() => {
    if (data) setContainers(data)
  }, [data, setContainers])

  return (
    <div>
      <DataGrid<Container>
        data={containers}
        columns={containerColumns}
        // drawer={
        //   <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
        //     Create Job
        //   </button>
        // }
      />
      {/* <CreateJobDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
    </div>
  )
}

export default ContainersPage
