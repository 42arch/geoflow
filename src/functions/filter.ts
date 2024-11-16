import { DataSet, SelectOption, TableData } from '@/helpers/types'

export enum StringFilterOperation {
  IS = 'is',
  IS_NOT = 'is_not',
  INCLUDES = 'includes',
  NOT_INCLUDES = 'not_includes'
}

export enum NumberFilterOperation {
  GREATER_THAN = 'gt',
  GREATER_THAN_OR_EQUAL = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_OR_EQUAL = 'lte',
  EQUAL = 'eq'
}

export const STRING_FILTER_OPTIONS: SelectOption[] = [
  { label: 'text is exactly', value: StringFilterOperation.IS },
  { label: 'text is not exactly', value: StringFilterOperation.IS_NOT },
  { label: 'text includes', value: StringFilterOperation.INCLUDES },
  { label: 'text doesnt includes', value: StringFilterOperation.NOT_INCLUDES }
]

export type TextFilterFunction = (
  ...args: [DataSet, string, string, string]
) => DataSet | undefined

const textFilter: TextFilterFunction = (
  dataset: DataSet,
  columnName: string,
  condition: string,
  conditionValue: string
) => {
  const data = dataset.data
  const properties = dataset.properties

  switch (condition) {
    case StringFilterOperation.IS:
      return {
        data: data.filter(
          (item) => (item[columnName] as string) === conditionValue
        ),
        properties
      }

    case StringFilterOperation.IS_NOT:
      return {
        data: data.filter(
          (item) => (item[columnName] as string) != conditionValue
        ),
        properties
      }

    case StringFilterOperation.INCLUDES:
      return {
        data: data.filter((item) =>
          (item[columnName] as string).includes(conditionValue)
        ),
        properties
      }

    case StringFilterOperation.NOT_INCLUDES:
      return {
        data: data.filter(
          (item) => !(item[columnName] as string).includes(conditionValue)
        ),
        properties
      }
  }
}

export default textFilter
