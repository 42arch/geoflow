interface Props {
  value: { [key: string]: string | number }[]
}

function TableDataOutput({ value }: Props) {
  return (
    <div className='flex items-center justify-end gap-2'>
      <span>Result:</span>
      <span>{value.length} rows</span>
    </div>
  )
}

export default TableDataOutput
