import { Icon } from '@iconify/react'
import { DataGrid } from '../components/data-display/DataGrid'
import { MOCK_DATA } from '../lib/constants'

const JobsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="h-10 w-1/2 border"></div>
        <button className="btn btn-primary">
          <Icon icon="material-symbols:add" width={20} />
          CREATE JOB
        </button>
      </div>
      <DataGrid data={MOCK_DATA} />
    </div>
  )
}

export default JobsPage
