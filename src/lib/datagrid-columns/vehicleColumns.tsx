import { createColumnHelper } from '@tanstack/react-table'
import type { Vehicle } from '../../types/dto'
import { Icon } from '@iconify/react/dist/iconify.js'

const columnHelper = createColumnHelper<Vehicle>()

export const vehicleColumns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => {
      const vehicle = info.row.original
      let icon = null
      switch (vehicle.type) {
        case 'Tractor':
          icon = <Icon icon="mdi:tractor" width={24} />
          break
        case 'Trailer':
          icon = <Icon icon="fa-solid:trailer" width={24} />
          break
        case 'Van':
          icon = <Icon icon="ph:van-bold" width={24} />
          break
        case 'Flatbed':
          icon = <Icon icon="mdi:truck-flatbed" width={24} />
          break
        default:
          icon = <Icon icon="mdi:car" width={24} />
      }
      return (
        <span style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center' }}>
          {icon} <span style={{ marginLeft: 6 }}>{info.getValue()}</span>
        </span>
      )
    },
    size: 100,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('rego', {
    header: 'Rego',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('vinNumber', {
    header: 'VIN',
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor('capacityKg', {
    header: 'Capacity (kg)',
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor('registrationExpiry', {
    header: 'Registration Expiry',
    cell: (info) => {
      const date = new Date(info.getValue())
      const isExpiringSoon = date < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      const isExpired = date < new Date()
      return (
        <span className={isExpired ? 'text-red-500' : isExpiringSoon ? 'text-yellow-500' : ''}>{date.toLocaleDateString()}</span>
      )
    },
    size: 150,
  }),
  columnHelper.accessor('insuranceExpiry', {
    header: 'Insurance Expiry',
    cell: (info) => {
      const date = new Date(info.getValue())
      const isExpiringSoon = date < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      const isExpired = date < new Date()
      return (
        <span className={isExpired ? 'text-red-500' : isExpiringSoon ? 'text-yellow-500' : ''}>{date.toLocaleDateString()}</span>
      )
    },
    size: 150,
  }),
]
