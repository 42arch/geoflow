import { InputKind, OutputKind } from '@/types'

const colorList: { kind: InputKind | OutputKind; color: string }[] = [
  {
    kind: 'number',
    color: '#6d28d9'
  },
  {
    kind: 'text',
    color: '#fbbf24'
  },
  {
    kind: 'boolean',
    color: '#10b981'
  },
  {
    kind: 'geojson',
    color: '#3b82f6'
  }
]

export const defaultColor = '#e11d48'

export const getHandleColor = (kind: InputKind | OutputKind) => {
  const item = colorList.find((i) => i.kind === kind)
  if (item) {
    return item.color
  } else {
    return defaultColor
  }
}
