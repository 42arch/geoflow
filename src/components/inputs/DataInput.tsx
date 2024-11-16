import { TableData } from '@/helpers/types'
import React from 'react'

interface DataInputProps {
  value: TableData
}

function DataInput({ value }: DataInputProps) {
  return <div className='flex h-6 items-center px-2'>Table Data</div>
}

export default DataInput
