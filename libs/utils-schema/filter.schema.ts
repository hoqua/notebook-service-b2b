import { z } from 'zod'

export const FilterSchema = z.object({
  value: z.string(),
  label: z.string()
})

export const FiltersEnum = z.enum([
  'mark',
  'proc',
  'ram',
  'hdd',
  'display',
  'lookout',
  'poweron',
  'proc_site'
])

const FilterArraySchema = z.array(FilterSchema)

export const FiltersSchema = z.object({
  mark: FilterArraySchema,
  proc: FilterArraySchema,
  ram: FilterArraySchema,
  hdd: FilterArraySchema,
  display: FilterArraySchema,
  lookout: FilterArraySchema,
  poweron: FilterArraySchema.optional(),
  proc_site: FilterArraySchema
})

export const GetFiltersSchema = z.object({
  error: z.number(),
  err_msg: z.string(),
  filters: FiltersSchema
})

export type FilterDto = z.infer<typeof GetFiltersSchema>
export type FiltersEnum = z.infer<typeof FiltersEnum>
export type Filter = z.infer<typeof FilterSchema>
