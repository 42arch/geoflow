import { DataArray, NodeFunction } from '@/types'
import { flattenEach, getCoords, getType } from '@turf/turf'
import { FeatureCollection } from 'geojson'

const geojsonToTable: NodeFunction = (geojson: FeatureCollection) => {
  const result: DataArray = []
  flattenEach(geojson, (feature, idx) => {
    const geomType = getType(feature)
    result.push({
      id: idx,
      type: geomType,
      ...feature.properties
    })
  })

  return [result]
}

export default geojsonToTable
