import { LineLayerSpecification } from 'mapbox-gl'
import { useEffect } from 'react'
import Map, { Layer, Source } from 'react-map-gl'

const lineStyle: LineLayerSpecification = {
  id: 'line',
  source: 'geojson-source',
  type: 'line',
  filter: ['==', '$type', 'LineString'],
  paint: {
    'line-width': 4,
    'line-color': '#ccff00'
  }
}

interface Props {
  value: object
}

export default function GeoJSONViewerOutput({ value }: Props) {
  useEffect(() => {}, [value])

  return (
    <div className='p-1'>
      <Map
        mapboxAccessToken='pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'
        initialViewState={{
          longitude: 0,
          latitude: 0,
          zoom: 3
        }}
        // style={{ width: 600, height: 400 }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      >
        <Source id='geojson-source' type='geojson' data={value}>
          <Layer {...lineStyle} />
        </Source>
      </Map>
    </div>
  )
}
