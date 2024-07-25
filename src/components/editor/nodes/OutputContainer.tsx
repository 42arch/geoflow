import GenericOutput from '@/components/outputs/GenericOutput'
import { Output, OutputKind } from '@/helpers/types'
import CustomHandle from './CustomHandle'
import TableDataOutput from '@/components/outputs/TableDataOutput'

const OutputComponents: Readonly<
  Record<OutputKind, (props: any) => JSX.Element>
> = {
  generic: GenericOutput,
  table: TableDataOutput
}

interface OutputProps {
  id: number
  output: Output
}

function OutputContainer({ id, output }: OutputProps) {
  const { value, kind, hasHandle } = output

  const OutputComp = OutputComponents[kind]

  if (!hasHandle) {
    return <OutputComp value={value} />
  }

  return (
    <CustomHandle id={String(id)} type='source'>
      <OutputComp value={value} />
    </CustomHandle>
  )
}

export default OutputContainer
