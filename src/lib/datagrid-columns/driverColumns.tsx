import { createColumnHelper } from '@tanstack/react-table'
import type { Driver } from '../../types/dto'

const columnHelper = createColumnHelper<Driver>()

export const driverColumns = [
  columnHelper.accessor((row) => `${row.firstname} ${row.lastname}`, {
    id: 'name',
    header: 'Name',
    cell: (info) => {
      const fullName = info.getValue()
      const initials = fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()

      return (
        <div className="flex items-center gap-1.5">
          <div className="avatar avatar-placeholder">
            <div className="text-neutral-content h-8 w-8 rounded-full bg-neutral-500">
              <span className="text-xs">{initials}</span>
            </div>
          </div>
          <span className="font-medium">{fullName}</span>
        </div>
      )
    },
    size: 170,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: (info) => (
      <a href={`mailto:${info.getValue()}`} className="link link-hover">
        {info.getValue()}
      </a>
    ),
    size: 170,
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone',
    cell: (info) => (
      <a href={`tel:${info.getValue()}`} className="link link-hover">
        {info.getValue()}
      </a>
    ),
    size: 150,
  }),
  columnHelper.accessor('licenseNumber', {
    header: 'License Number',
    cell: (info) => <span className="font-mono text-sm">{info.getValue()}</span>,
    size: 130,
  }),
  columnHelper.accessor('licenseExpiryDate', {
    header: 'License Expiry',
    cell: (info) => {
      const date = new Date(info.getValue())
      const isExpiringSoon = date < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      const isExpired = date < new Date()

      const className = isExpired ? 'text-error font-medium' : isExpiringSoon ? 'text-orange-400 font-medium' : ''

      return <span className={className}>{date.toLocaleDateString()}</span>
    },
    size: 120,
  }),
  columnHelper.accessor('isActive', {
    header: 'Status',
    cell: (info) => {
      const isActive = info.getValue()

      const isLicenseValid = new Date(info.row.original.licenseExpiryDate) > new Date()
      const badgeClass = isActive && isLicenseValid ? 'badge-ghost' : 'badge-error'
      const statusText = isActive && isLicenseValid ? 'Active' : 'Inactive'

      return <span className={`badge ${badgeClass} `}>{statusText}</span>
    },
    size: 80,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created',
    cell: (info) => {
      const date = new Date(info.getValue())
      return <span className="text-sm opacity-70">{date.toLocaleDateString()}</span>
    },
    size: 100,
  }),
]
