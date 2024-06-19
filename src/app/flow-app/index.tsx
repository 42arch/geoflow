import {
  Edge,
  Node,
  ReactFlowProvider,
  useEdges,
  useNodes,
  useStoreApi
} from 'reactflow'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import Flow from './flow'
import Aside from './aside'
import { useState } from 'react'
import { runProcess } from '@/lib/run'

function FlowApp() {
  const store = useStoreApi()
  const nodes = useNodes()
  const edges = useEdges()

  const run = () => {
    console.log('Running', nodes, edges)
    const result = runProcess(nodes, edges)

    // const { nodeInternals, edges, nodes } = store.getState()
    // console.log('Running', nodeInternals.values())
  }

  return (
    <>
      <div className='flex h-12 items-center justify-end'>
        <Button onClick={run}>RUN</Button>
      </div>
      <div className='h-[calc(100%-48px)]'>
        <ResizablePanelGroup direction='horizontal' className='h-full w-full'>
          <ResizablePanel defaultSize={20} maxSize={20} minSize={10}>
            <Aside />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80}>
            <Flow />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  )
}

export default function FlowAppWithProvider() {
  return (
    <div className='h-full w-full p-4'>
      <ReactFlowProvider>
        <FlowApp />
      </ReactFlowProvider>
    </div>
  )
}
