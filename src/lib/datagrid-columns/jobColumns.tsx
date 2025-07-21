import { createColumnHelper } from '@tanstack/react-table'
import type { Job } from '../../types/dto'
import { JobStatus } from '../../types/dto/enums'

const columnHelper = createColumnHelper<Job>()

export const jobColumns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    size: 50,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => {
      const status = info.getValue() as JobStatus
      const badgeClass = {
        [JobStatus.Booked]: 'badge-secondary',
        [JobStatus.Assigned]: 'badge-warning',
        [JobStatus.InProgress]: 'badge-info',
        [JobStatus.Completed]: 'badge-success',
      }[status]
      return <span className={`badge ${badgeClass}`}>{status}</span>
    },
  }),
  columnHelper.accessor('pickupAddress', {
    header: 'Pickup Address',
    cell: (info) => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor('deliveryAddress', {
    header: 'Delivery Address',
    cell: (info) => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor('scheduledPickup', {
    header: 'Scheduled Pickup',
    cell: (info) => {
      const date = new Date(info.getValue())
      return date.toLocaleString()
    },
    size: 150,
  }),
  columnHelper.accessor('scheduledDelivery', {
    header: 'Scheduled Delivery',
    cell: (info) => {
      const date = new Date(info.getValue())
      return date.toLocaleString()
    },
    size: 150,
  }),
]
