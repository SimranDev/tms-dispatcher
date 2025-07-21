import { useState, useMemo, useEffect, type InputHTMLAttributes, type ReactNode } from 'react'
import { Icon } from '@iconify/react'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table'

interface DataGridProps<T = Record<string, unknown>> {
  data: T[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[]
  drawer?: ReactNode
}

// A debounced input react component
const DebouncedInput: React.FC<
  {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>
> = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const DataGrid = <T,>({ data, columns, drawer }: DataGridProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const memoizedData = useMemo(() => data, [data])

  const table = useReactTable({
    data: memoizedData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          className="input input-bordered w-full max-w-xs"
          placeholder="Search all columns..."
        />
        {drawer}
      </div>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} style={{ width: header.getSize() !== 200 ? header.getSize() : undefined }}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort() ? 'cursor-pointer select-none flex items-center gap-2' : '',
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <Icon icon="lsicon:up-filled" />,
                          desc: <Icon icon="lsicon:down-filled" />,
                        }[header.column.getIsSorted() as string] ??
                          (header.column.getCanSort() ? <Icon icon="material-symbols:sort" /> : null)}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <span className="text-sm opacity-70">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>{' '}
          | Showing {table.getRowModel().rows.length} of {data.length} total rows
        </span>
        <div className="flex items-center gap-2">
          <div className="join">
            <button className="join-item btn btn-sm" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              «
            </button>
            <button className="join-item btn btn-sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              ‹
            </button>
            <button className="join-item btn btn-sm btn-disabled">Page {table.getState().pagination.pageIndex + 1}</button>
            <button className="join-item btn btn-sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              ›
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              »
            </button>
          </div>
          <select
            className="select select-bordered select-sm"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default DataGrid
