import { NodeFunction } from '@/types'
import { FeatureCollection } from 'geojson'

function readFileAsText(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        resolve({
          fileName: file.name,
          fileSize: file.size,
          content: event.target?.result
        })
      } catch (error) {
        reject(new Error('Error reading file'))
      }
    }

    reader.onerror = (error) => {
      reject(new Error('Error reading file'))
    }

    reader.readAsText(file)
  })
}

const geojsonFile: NodeFunction = async (file?: File) => {
  console.log('file', file)
  if (!file) {
    return [null, '']
  }
  const result = (await readFileAsText(file)) as {
    fileName: string
    fileSize: number
    content: string
  }
  // todo: need validate geojson schema
  const geojson = JSON.parse(result.content) as FeatureCollection
  return [geojson, result.fileName]
}

export default geojsonFile
