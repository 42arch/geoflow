import { DataSet, SelectOption, TableData } from '@/helpers/types'
import { createId } from '@/utils/create-id'

const cities: { [key: string]: string | number }[] = [
  {
    name: 'New York',
    latitude: 40.7128,
    longitude: -74.006,
    population: 8419000,
    gdp: 1710000
  },
  {
    name: 'Los Angeles',
    latitude: 34.0522,
    longitude: -118.2437,
    population: 3980000,
    gdp: 1040000
  },
  {
    name: 'Tokyo',
    latitude: 35.6895,
    longitude: 139.6917,
    population: 13960000,
    gdp: 1690000
  },
  {
    name: 'London',
    latitude: 51.5074,
    longitude: -0.1278,
    population: 8982000,
    gdp: 841000
  },
  {
    name: 'Shanghai',
    latitude: 31.2304,
    longitude: 121.4737,
    population: 24150000,
    gdp: 516000
  },
  {
    name: 'Paris',
    latitude: 48.8566,
    longitude: 2.3522,
    population: 2148000,
    gdp: 735000
  },
  {
    name: 'Beijing',
    latitude: 39.9042,
    longitude: 116.4074,
    population: 21540000,
    gdp: 458000
  },
  {
    name: 'Moscow',
    latitude: 55.7558,
    longitude: 37.6176,
    population: 11920000,
    gdp: 707000
  },
  {
    name: 'Mumbai',
    latitude: 19.076,
    longitude: 72.8777,
    population: 12440000,
    gdp: 368000
  },
  {
    name: 'São Paulo',
    latitude: -23.5505,
    longitude: -46.6333,
    population: 12250000,
    gdp: 430000
  },
  {
    name: 'Seoul',
    latitude: 37.5665,
    longitude: 126.978,
    population: 9760000,
    gdp: 779000
  },
  {
    name: 'Mexico City',
    latitude: 19.4326,
    longitude: -99.1332,
    population: 9200000,
    gdp: 411000
  },
  {
    name: 'Cairo',
    latitude: 30.0444,
    longitude: 31.2357,
    population: 9500000,
    gdp: 269000
  },
  {
    name: 'Bangkok',
    latitude: 13.7563,
    longitude: 100.5018,
    population: 8300000,
    gdp: 329000
  },
  {
    name: 'Buenos Aires',
    latitude: -34.6037,
    longitude: -58.3816,
    population: 2890000,
    gdp: 245000
  },
  {
    name: 'Istanbul',
    latitude: 41.0082,
    longitude: 28.9784,
    population: 15460000,
    gdp: 222000
  },
  {
    name: 'Karachi',
    latitude: 24.8607,
    longitude: 67.0011,
    population: 14910000,
    gdp: 164000
  },
  {
    name: 'Delhi',
    latitude: 28.7041,
    longitude: 77.1025,
    population: 16750000,
    gdp: 293000
  },
  {
    name: 'Jakarta',
    latitude: -6.2088,
    longitude: 106.8456,
    population: 10770487,
    gdp: 320000
  },
  {
    name: 'Rio de Janeiro',
    latitude: -22.9068,
    longitude: -43.1729,
    population: 6748000,
    gdp: 200000
  },
  {
    name: 'Lagos',
    latitude: 6.5244,
    longitude: 3.3792,
    population: 14200000,
    gdp: 108000
  },
  {
    name: 'Kolkata',
    latitude: 22.5726,
    longitude: 88.3639,
    population: 14850000,
    gdp: 150000
  },
  {
    name: 'Manila',
    latitude: 14.5995,
    longitude: 120.9842,
    population: 1780000,
    gdp: 136000
  },
  {
    name: 'Tianjin',
    latitude: 39.3434,
    longitude: 117.3616,
    population: 15620000,
    gdp: 371000
  },
  {
    name: 'Guangzhou',
    latitude: 23.1291,
    longitude: 113.2644,
    population: 14904000,
    gdp: 369000
  },
  {
    name: 'Lima',
    latitude: -12.0464,
    longitude: -77.0428,
    population: 9675000,
    gdp: 202000
  },
  {
    name: 'Shenzhen',
    latitude: 22.5431,
    longitude: 114.0579,
    population: 12530000,
    gdp: 361000
  },
  {
    name: 'Chennai',
    latitude: 13.0827,
    longitude: 80.2707,
    population: 7090000,
    gdp: 74000
  },
  {
    name: 'Bangalore',
    latitude: 12.9716,
    longitude: 77.5946,
    population: 8444000,
    gdp: 110000
  },
  {
    name: 'Ho Chi Minh City',
    latitude: 10.8231,
    longitude: 106.6297,
    population: 8425000,
    gdp: 95000
  }
]

const TestDataMap: Record<string, { [key: string]: string | number }[]> = {
  cities: cities
}

export const TEST_DATA_OPTIONS: SelectOption[] = [
  { label: 'Cities', value: 'cities' }
]

export type TestDataFunction = (...args: [string]) => DataSet | undefined

const testData: TestDataFunction = (v: string) => {
  const originalData = TestDataMap[v]
  const tableData: TableData = originalData?.map((row) => {
    return {
      key: createId(),
      ...row
    }
  })
  return {
    data: tableData,
    properties: {
      columns: Object.keys(tableData[0])
    }
  }
}

export default testData
