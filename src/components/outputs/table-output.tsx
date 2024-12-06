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
import { Resizable } from 're-resizable'
import { ArrowsOutSimple } from '@phosphor-icons/react'
import { ScrollArea } from '../ui/scroll-area'

interface Props {
  value: DataArray
}

function TableOutput({ value }: Props) {
  if (value.length === 0) {
    return <div className='flex items-center justify-end gap-2'>Empty Data</div>
  }

  const fields = Object.keys(value[0])

  return (
    <Resizable
      defaultSize={{
        width: '300px',
        height: '200px'
      }}
      minHeight={100}
      minWidth={208}
      enable={{
        top: false,
        right: false,
        bottom: false,
        left: false,
        topRight: false,
        bottomLeft: false,
        topLeft: false,
        bottomRight: true
      }}
      handleComponent={{
        bottomRight: <ArrowsOutSimple className='rotate-90' />
      }}
    >
      <ScrollArea className='h-full w-full'>
        <Table>
          <TableHeader>
            <TableRow>
              {fields?.map((field) => (
                <TableHead key={field}>{field}</TableHead>
              ))}
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
        </Table>
      </ScrollArea>
    </Resizable>
  )
}

export default TableOutput
