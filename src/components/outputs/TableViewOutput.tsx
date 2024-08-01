import { DataSet, TableData } from '@/helpers/types'
import DataTable from '../common/DataTable'

interface Props {
  value: DataSet
}

function TableViewOutput({ value }: Props) {
  const columns = value.properties.columns

  return (
    <div className='flex items-center justify-end gap-2'>
      {value.data.length === 0 ? (
        <div className='flex min-h-24 w-full items-center justify-center'>
          Data not available.
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={value.data}
          pagination={{ pageSize: 10 }}
        />
      )}
    </div>
  )
}

export default TableViewOutput

function getAllKeysFromTableData(tableData: TableData) {
  const allKeys = new Set<string>()

  tableData.forEach((row) => {
    Object.keys(row).forEach((key) => allKeys.add(key))
  })

  return Array.from(allKeys)
}
