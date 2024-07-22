import React from 'react'

interface NodeHeaderProps {
  label: string
}
function NodeHeader({ label }: NodeHeaderProps) {
  return (
    <div className='flex items-center justify-center px-4 py-2'>{label}</div>
  )
}

export default NodeHeader
