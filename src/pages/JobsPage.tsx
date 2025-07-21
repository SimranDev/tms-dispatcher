import { DataGrid } from '../components/data-display/DataGrid'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { jobsAPI } from '../api'
import type { Job } from '../types/dto'
import { useShallow } from 'zustand/shallow'
import { useGStore } from '../store/gStore'
import CreateJobDrawer from '../components/drawer/CreateJobDrawer'
import { jobColumns } from '../lib/datagrid-columns/jobColumns'

const JobsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [jobs, setJobs] = useGStore(useShallow((s) => [s.jobs, s.setJobs]))

  const { data } = useQuery({
    queryKey: ['jobs'],
    queryFn: jobsAPI.getJobs,
    initialData: [],
  })

  useEffect(() => {
    if (data) setJobs(data)
  }, [data, setJobs])

  return (
    <div>
      <DataGrid<Job>
        data={jobs}
        columns={jobColumns}
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
