import FlowCanvas from '@/components/flow-canvas'
import { ReactFlowProvider } from '@xyflow/react'
import Header from './header'
import Sider from './sidebar'

function FlowApp() {
  return (
    <div className='flex h-full w-full flex-1 flex-col gap-4 p-4'>
      <ReactFlowProvider>
        <div className='border-divider rounded-md border px-4 py-3'>
          <Header />
        </div>
        <div className='flex h-full flex-row gap-4'>
          <div className='border-divider w-[16rem] rounded-md border p-4'>
            <Sider />
          </div>
          <div className='border-divider w-full rounded-md border p-4'>
            <FlowCanvas />
          </div>
        </div>
      </ReactFlowProvider>
    </div>
  )
}

export default FlowApp
