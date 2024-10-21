import { fetchWrapper } from '../../../../service/fetch-wrapper'
import type {
  Notebook,
  NotebookDto
} from '../../../../utils-schema/notebook.schema'

const PAGE_DATA_LENGTH = 21

export async function getFilteredAndPaginatedNotebooksData(
  page: number,
  endpoint: string,
  category: string,
  objectSearchParams: { [key: string]: string | string[] | undefined }
): Promise<{ notebooks: Notebook[]; totalPages: number }> {
  const searchParams = objectToSearchParams(objectSearchParams)

  const notebooksToProcess = await getAllNotebooksData(
    endpoint,
    category,
    searchParams
  )
  if (!notebooksToProcess || notebooksToProcess.length === 0) {
    return { notebooks: [], totalPages: 0 }
  }

  const totalItems = notebooksToProcess.length
  const totalPages = Math.ceil(totalItems / PAGE_DATA_LENGTH)

  const paginatedNotebooks = paginateNotebooks(notebooksToProcess, page)
  return { notebooks: paginatedNotebooks, totalPages }
}

async function getAllNotebooksData(
  endpoint: string,
  category: string,
  searchParams: URLSearchParams
): Promise<Notebook[] | null> {
  const urlWithParams = `${endpoint}?category=${category}&${searchParams.toString()}`

  const response = await fetchWrapper<unknown, NotebookDto>({
    url: urlWithParams
  })
  if (response.result && response.result.items.length > 0) {
    return response.result.items
  }

  return null
}

function paginateNotebooks(
  filteredNotebooks: Notebook[],
  page: number
): Notebook[] {
  const startIndex = (page - 1) * PAGE_DATA_LENGTH
  const endIndex = startIndex + PAGE_DATA_LENGTH
  return filteredNotebooks.slice(startIndex, endIndex)
}

function objectToSearchParams(obj: {
  [key: string]: string | string[] | undefined
}): URLSearchParams {
  const params = new URLSearchParams()

  for (const [key, value] of Object.entries(obj)) {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.set(key, value)
    }
  }

  return params
}
