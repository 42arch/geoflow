import { get } from 'lodash-es'

export function getObjectValue(obj: object, path: string): any {
  return get(obj, path)
}
