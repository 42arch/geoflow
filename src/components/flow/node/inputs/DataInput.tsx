interface InputProps {
  value: number
}

function DataInput({ value }: InputProps) {
  console.log('data value', value)

  return (
    <div className='h-6 w-full'>
      <div className='text-green-600'>Data</div>
    </div>
  )
}

export default DataInput
