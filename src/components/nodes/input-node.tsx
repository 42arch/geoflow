import useSourceTarget from '@/hooks/useSourceTarget'
import { useFlowStore } from '@/store'
import { ChangeEventHandler } from 'react'
import {
  Handle,
  Node,
  NodeProps,
  Position,
  getOutgoers,
  useEdges,
  useNodes,
  useReactFlow
} from 'reactflow'

type NodeData = {
  output: any
}

export default function InputNode(props: Node<NodeData>) {
  const { updateNode } = useFlowStore()
  const { sources, targets } = useSourceTarget(props)
  console.log(89999999, sources, targets)

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value

    const currentNode: Node<NodeData> = {
      ...props,
      data: {
        output: value
      }
    }

    updateNode(currentNode)

    // setNodes((nds) =>
    //   nds.map((n) => {
    //     if (n.id === props.id) {
    //       return {
    //         ...n,
    //         data: {
    //           ...props.data,
    //           output: e.target.value
    //         }
    //       }
    //     }
    //     if (targets.find((o) => o.id === n.id)) {
    //       return {
    //         ...n,
    //         data: {
    //           ...n.data,
    //           input: e.target.value
    //         }
    //       }
    //     }

    //     return n
    //   })
    // )
  }

  return (
    <>
      <div>
        <p>Input Node</p>
        <input
          type='number'
          className='border-2 border-slate-400'
          id='b'
          onChange={onChange}
        />
      </div>
      <Handle type='source' position={Position.Bottom} id='a' />
    </>
  )
}
