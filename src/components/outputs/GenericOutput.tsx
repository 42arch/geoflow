interface GenericOutputProps {
  value: number
}

function GenericOutput({ value }: GenericOutputProps) {
  return (
    <div className='flex items-center justify-end gap-2'>
      <span>Result:</span>
      <span>{value}</span>
    </div>
  )
}

export default GenericOutput
