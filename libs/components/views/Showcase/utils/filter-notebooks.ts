import { fetchWrapper } from '../../../../service/fetch-wrapper'
import type {
  Notebook,
  NotebookDto
} from '../../../../utils-schema/notebook.schema'

const PAGE_DATA_LENGTH = 12

export async function getFilteredAndPaginatedNotebooksData(
  page: number,
  endpoint: string,
  objectSearchParams: { [key: string]: string | string[] | undefined }
): Promise<{ notebooks: Notebook[]; totalPages: number }> {
  const searchParams = objectToSearchParams(objectSearchParams)
  const notebooksToProcess = await getNotebooksData(endpoint, searchParams)

  if (!notebooksToProcess || notebooksToProcess.length === 0) {
    return { notebooks: [], totalPages: 0 }
  }

  const filteredAndPaginated = paginateAndFilterNotebooks(
    notebooksToProcess,
    page,
    objectSearchParams
  )
  return filteredAndPaginated
}

async function getNotebooksData(
  endpoint: string,
  searchParams: URLSearchParams
): Promise<Notebook[] | null> {
  try {
    const response = await fetchWrapper<unknown, NotebookDto>({
      url: `${endpoint}?${searchParams.toString()}`
    })
    if (response.result && response.result.items.length > 0) {
      return response.result.items
    }

    return null
  } catch {
    return null
  }
}

function paginateAndFilterNotebooks(
  notebooks: Notebook[],
  page: number,
  searchParams: { [key: string]: string | string[] | undefined }
) {
  const filteredNotebooks = notebooks.filter((notebook) =>
    doesNotebookMatchFilters(notebook, searchParams)
  )
  const totalItems = filteredNotebooks.length
  const totalPages = Math.ceil(totalItems / PAGE_DATA_LENGTH)

  const paginatedNotebooks = filteredNotebooks.slice(
    (page - 1) * PAGE_DATA_LENGTH,
    page * PAGE_DATA_LENGTH
  )

  return {
    notebooks: paginatedNotebooks,
    totalPages
  }
}

function doesNotebookMatchFilters(
  notebook: Notebook,
  params: { [key: string]: string | string[] | undefined }
): boolean {
  const checks = [
    { key: 'serialNumber', value: notebook.serial_num },
    { key: 'notebookName', value: notebook.item_name },
    {
      key: 'display',
      value: () => {
        const displaySize = extractDisplaySize(notebook.display)
        return (
          displaySize &&
          (Array.isArray(params.display)
            ? params.display
            : [params.display]
          ).some((filter) => displayMatches(displaySize, filter as string))
        )
      },
      isDynamic: true
    }
  ]

  return checks.every(({ key, value, isDynamic }) => {
    const param = params[key]
    if (!param) return true
    if (isDynamic) return value()
    return (value as string)
      .toLowerCase()
      .includes((param as string).toLowerCase())
  })
}

function extractDisplaySize(display: string): number | null {
  const match = display.match(/(\d{2}(\.\d+)?)/)
  return match ? parseFloat(match[0]) : null
}

function displayMatches(displaySize: number, filterValue: string): boolean {
  if (filterValue.includes('-')) {
    const [min, max] = filterValue.split('-').map(parseFloat)
    return displaySize >= min && displaySize <= max
  }
  return displaySize === parseFloat(filterValue)
}

const paramsToExclude = new Set(['display', 'serialNumber', 'notebookName'])

function objectToSearchParams(obj: {
  [key: string]: string | string[] | undefined
}): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(obj)) {
    if (paramsToExclude.has(key)) {
      continue
    }
    if (Array.isArray(value)) {
      params.append(key, value.join(','))
    } else {
      params.set(key, value || '')
    }
  }
  return params
}
