import { memo, useState } from 'react'
import { Position, NodeProps, Handle, useReactFlow } from '@xyflow/react'

function InputNode({ id, data }: NodeProps) {
  const { updateNodeData } = useReactFlow()
  const [text, setText] = useState(data.text as string)
  const updateText = (text: string) => {
    // avoid jumping caret with a synchronous update
    setText(text)
    // update actual node data
    updateNodeData(id, { text })
  }

  return (
    <div
      style={{
        background: '#eee',
        color: '#222',
        padding: 10,
        fontSize: 12,
        borderRadius: 10
      }}
    >
      <div>
        <input
          onChange={(event) => updateText(event.target.value)}
          value={text || ''}
        />
      </div>
      <Handle type='source' position={Position.Right} />
    </div>
  )
}

export default memo(InputNode)
