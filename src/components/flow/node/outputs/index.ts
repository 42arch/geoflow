import { Output } from '@/helpers/types'
import DisplayOutput from './DisplayOutput'

const outputMap: Record<Output['kind'], () => JSX.Element> = {
  display: DisplayOutput
}

export default outputMap
