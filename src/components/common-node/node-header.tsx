interface NodeHeaderProps {
  label: string
}

function NodeHeader({ label }: NodeHeaderProps) {
  return (
    <div className='drag-handle__custom flex h-10 cursor-move items-center justify-center rounded-t-md border-b px-4 py-2 text-base font-semibold uppercase'>
      {label}
    </div>
  )
}

export default NodeHeader
