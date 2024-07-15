import Editor from '@/components/editor'
import Header from '@/components/header'
import Sider from '@/components/sider'
import React from 'react'

function FlowApp() {
  return (
    <div className='h-full w-full '>
      <div className='h-[4rem]'>
        <Header />
      </div>
      <div className='flex h-[calc(100%-4rem)]'>
        <div className='w-[16rem]'>
          <Sider />
        </div>
        <div className='w-[calc(100%-16rem)]'>
          <Editor />
        </div>
      </div>
    </div>
  )
}

export default FlowApp
