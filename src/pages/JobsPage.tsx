import { DataGrid } from '../components/data-display/DataGrid'
import CreateJobDrawer from '../components/drawer/CreateJobDrawer'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { jobsAPI } from '../api'

const JobsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  // const [jobs] = useGStore(useShallow((s) => [s.jobs, s.addJob]))
  const { data } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsAPI.getJobs,
    initialData: [],
  })

  return (
    <div>
      <DataGrid
        data={data}
        drawer={
          <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}>
            Create Job
          </button>
        }
      />
      <CreateJobDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  )
}

export default JobsPage
