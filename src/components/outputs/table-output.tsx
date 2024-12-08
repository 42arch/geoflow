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
import { ArrowsOut, ArrowsOutSimple } from '@phosphor-icons/react'
import { ScrollArea } from '../ui/scroll-area'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'

interface Props {
  value: DataArray
}

function TableContainer({ value }: Props) {
  const fields = Object.keys(value[0])

  return (
    <ScrollArea className='h-full w-full'>
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
      </Table>
    </ScrollArea>
  )
}

function TableOutput({ value }: Props) {
  if (value.length === 0) {
    return <div className='flex items-center justify-end gap-2'>Empty Data</div>
  }

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
      <div className='h-full w-full'>
        <Dialog>
          <DialogTrigger asChild>
            <ArrowsOut
              className='absolute right-0 top-0 z-10 cursor-pointer'
              // onClick={() => {
              //   setIsExpanded((v) => !v)
              // }}
            />
          </DialogTrigger>
          <DialogContent className='h-screen min-w-full p-1'>
            <VisuallyHidden.Root>
              <DialogTitle>table</DialogTitle>
            </VisuallyHidden.Root>
            <TableContainer value={value} />
          </DialogContent>
        </Dialog>
        <TableContainer value={value} />
      </div>
    </Resizable>
  )
}

export default TableOutput
