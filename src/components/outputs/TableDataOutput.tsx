import { DataSet } from '@/helpers/types'

interface Props {
  value: DataSet
}

function TableDataOutput({ value }: Props) {
  return (
    <div className='flex items-center justify-end gap-2'>
      <span>Result:</span>
      <span>{value?.data?.length || 0} rows</span>
    </div>
  )
}

export default TableDataOutput
