interface NodeHeaderProps {
  label: string
}

function NodeHeader({ label }: NodeHeaderProps) {
  return (
    <div className='flex items-center justify-center rounded-t-md border-b-2 border-b-default-300 bg-default-100 px-4 py-2 font-bold'>
      {label}
    </div>
  )
}

export default NodeHeader
