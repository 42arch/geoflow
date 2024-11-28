import { DataArray } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

interface Props {
  value: DataArray
}

function TableOutput({ value }: Props) {
  if (value.length === 0) {
    return <div className='flex items-center justify-end gap-2'>Empty Data</div>
  }

  const fields = Object.keys(value[0])

  return (
    <div className='flex items-center justify-end gap-2'>
      <Table>
        <TableHeader>
          <TableRow>
            {fields?.map((field) => <TableHead key={field}>{field}</TableHead>)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {value.map((item) => (
            <TableRow key={item.id}>
              {fields?.map((field) => (
                <TableCell key={field}>{item[field]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'>{value.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

export default TableOutput
