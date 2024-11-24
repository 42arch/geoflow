import { ValueKind } from '@/types'

export const HANDLE_COLOR: Record<ValueKind, string> = {
  number: '#2563eb',
  'geojson-point': '#22c55e',
  'geojson-line': '#d946ef',
  'geojson-polygon': '#ef4444'
}
