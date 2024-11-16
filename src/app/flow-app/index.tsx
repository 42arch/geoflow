import Editor from '@/components/editor'
import Header from '@/components/header'
import Sider from '@/components/sider'
import { ReactFlowProvider } from '@xyflow/react'
import React from 'react'

function FlowApp() {
  return (
    <div className='flex h-full w-full flex-1 flex-col gap-4 p-4'>
      <ReactFlowProvider>
        <div className='rounded-medium border-small border-divider px-4 py-3'>
          <Header />
        </div>
        <div className='flex h-full flex-row gap-4'>
          <div className='w-[16rem] rounded-medium border-small border-divider p-4'>
            <Sider />
          </div>
          <div className='w-full rounded-medium border-small border-divider p-4'>
            <Editor />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default FlowApp
