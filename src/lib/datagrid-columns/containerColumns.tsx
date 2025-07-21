import { createColumnHelper } from '@tanstack/react-table'
import type { Container } from '../../types/dto'
import { Icon } from '@iconify/react/dist/iconify.js'
import { ContainerSize } from '../../types/dto/enums'

const columnHelper = createColumnHelper<Container>()

export const containerColumns = [
  columnHelper.accessor('containerNumber', {
    header: 'Container Number',
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('size', {
    header: 'Size',
    cell: (info) => {
      const size = info.getValue()
      // Example: 20ft, 40ft, etc.
      let color = 'text-blue-500' // default blue
      if (size === ContainerSize.S45ft) {
        color = 'text-green-500' // green
      } else if (size === ContainerSize.S40ft) {
        color = 'text-blue-500' // blue
      } else {
        color = 'text-gray-500' // gray
      }
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon icon="lucide:container" className={color} />
          <span style={{ fontWeight: 'semibold' }}>{size.slice(1)}</span>
        </span>
      )
    },
    size: 140,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor('notes', {
    header: 'Notes',
    cell: (info) => {
      const value = info.getValue() || 'N/A'
      return (
        <div className="w-56 truncate overflow-x-hidden align-middle whitespace-nowrap" title={value}>
          {value}
        </div>
      )
    },
    size: 100,
  }),
]
