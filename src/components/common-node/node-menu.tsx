import { PropsWithChildren } from 'react'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
} from '../ui/context-menu'
import { Copy, Trash, XCircle } from '@phosphor-icons/react'
import { NodeProps, useReactFlow } from '@xyflow/react'
import { CommonNode } from '.'
import { NODE_LIST } from '@/utils/node-list'

function NodeMenu({
  id,
  data,
  children
}: PropsWithChildren<NodeProps<CommonNode>>) {
  const { deleteElements, updateNodeData } = useReactFlow()

  const handleDuplicate = () => {}

  const handleResetInputs = () => {
    const rawNode = NODE_LIST.find((node) => node.type === data.type)
    // todo: don't reset the connected inputs
    if (rawNode) {
      updateNodeData(id, rawNode)
    }
  }

  const handleResetConnections = () => {}

  const handleDelete = () => {
    deleteElements({ nodes: [{ id: id }] })
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className='w-40'>
        <ContextMenuItem
          onClick={handleDuplicate}
          className='pointer-events-none'
        >
          <Copy className='mr-2' />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <XCircle className='mr-2' />
            Reset
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className=''>
            <ContextMenuItem onClick={handleResetInputs}>
              Reset Inputs
            </ContextMenuItem>
            <ContextMenuItem onClick={handleResetConnections}>
              Reset Connections
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem
          className='text-red-500 focus:text-red-500'
          onClick={handleDelete}
        >
          <Trash className='mr-2' />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default NodeMenu
