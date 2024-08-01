import textFilter from './filter'
import math from './math'
import testData from './test-data'

interface FunctionMap {
  [key: string]: (...args: any[]) => any
}

const functionRegistry: FunctionMap = {
  math: math,
  filter: textFilter,
  test_data: testData
}

export function executeFunction<T extends keyof FunctionMap>(
  id: T,
  ...args: Parameters<FunctionMap[T]>
): ReturnType<FunctionMap[T]> {
  const func = functionRegistry[id]
  if (typeof func === 'function') {
    return func(...args)
  } else {
    return args[0]
    // throw new Error(`Function with id ${id} not found`)
  }
}
