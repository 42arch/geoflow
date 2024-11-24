interface NodeHeaderProps {
  label: string
}

function NodeHeader({ label }: NodeHeaderProps) {
  return (
    <div className='drag-handle__custom bg-default-100 flex cursor-move items-center justify-center rounded-t-md border-b px-4 py-2 font-bold'>
      {label}
    </div>
  )
}

export default NodeHeader
