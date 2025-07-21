import { createColumnHelper } from '@tanstack/react-table'
import type { Customer } from '../../types/dto'

const columnHelper = createColumnHelper<Customer>()

export const customerColumns = [
  columnHelper.accessor('companyName', {
    header: 'Company Name',
    cell: (info) => {
      const companyName = info.getValue()
      const initials = companyName
        ? companyName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : 'N/A'
      return (
        <div className="flex items-center gap-1.5">
          <div className="avatar avatar-placeholder">
            <div className="text-neutral-content h-8 w-8 rounded bg-neutral-500">
              <span className="text-xs">{initials}</span>
            </div>
          </div>
          <span className="font-medium">{companyName}</span>
        </div>
      )
    },
    size: 100,
  }),
  columnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => info.getValue(),
    size: 230,
  }),
  columnHelper.accessor('contactPerson', {
    header: 'Contact Person',
    cell: (info) => info.getValue(),
    size: 150,
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone',
    cell: (info) => info.getValue(),
    size: 150,
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
]
