import { TableData } from '@/helpers/types'

interface DataSetInputProps {
  value: TableData
}

function DataSetInput({ value }: DataSetInputProps) {
  return <div className='flex h-6 items-center px-2'>Table Data</div>
}

export default DataSetInput
