'use client'

import { ReactFlowProvider } from 'reactflow'
import App from './App'

export default function Index() {
  return (
    <div className='h-full w-full p-4'>
      <ReactFlowProvider>
        <App />
      </ReactFlowProvider>
    </div>
  )
}
