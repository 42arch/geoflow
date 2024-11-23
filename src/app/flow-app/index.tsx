import FlowCanvas from '@/components/flow-canvas'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'
import Header from './header'
import Sider from './sidebar'

function FlowApp() {
  return (
    <div className='flex h-full w-full flex-1 flex-col gap-4 p-4'>
      <ReactFlowProvider>
        <div className='rounded-md border border-divider px-4 py-3'>
          <Header />
        </div>
        <div className='flex h-full flex-row gap-4'>
          <div className='w-[16rem] rounded-md border border-divider p-4'>
            <Sider />
          </div>
          <div className='w-full rounded-md border border-divider p-4'>
            <FlowCanvas />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default FlowApp
