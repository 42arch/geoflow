import { getFeatureCollectionTypes } from '@/utils/geojson'
import { FeatureCollection } from 'geojson'
import { useMemo } from 'react'

interface Props {
  value: FeatureCollection
}

export default function GeoJSONInput({ value }: Props) {
  const type = useMemo(() => {
    if (value) {
      return getFeatureCollectionTypes(value)
    }
  }, [value])

  // todo: add type icon

  return <div className='flex h-9 items-center px-1'>GeoJSON</div>
}
