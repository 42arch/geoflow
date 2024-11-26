import { getType } from '@turf/turf'
import { FeatureCollection } from 'geojson'

export const getFeatureCollectionTypes = (
  featureCollection: FeatureCollection
) => {
  const types: string[] = []
  featureCollection.features.forEach((feature) => {
    const type = getType(feature)
    if (!types.includes(type)) {
      types.push(type)
    }
  })

  return types
}
