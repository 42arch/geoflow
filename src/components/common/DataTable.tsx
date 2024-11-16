import { TableData } from '@/helpers/types'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue
} from '@nextui-org/react'
import { useMemo, useState } from 'react'

interface DataTableProps {
  columns: string[]
  data: TableData
  pagination: {
    pageSize: number
  }
}

function DataTable({ columns, data, pagination }: DataTableProps) {
  const [page, setPage] = useState(1)
  const { pageSize } = pagination

  const pages = data.length / pageSize

  const items = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }, [page, data])

  return (
    <Table
      aria-label='Example table with client side pagination'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='secondary'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[222px]'
      }}
    >
      <TableHeader>
        {columns?.map((column) => (
          <TableColumn key={column}>{column}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className='w-32 min-w-28 truncate'>
                <div className='truncate'>{getKeyValue(item, columnKey)}</div>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable
