import { z } from 'zod'

export const ExcelSchema = z.object({
  error: z.number(),
  err_msg: z.string(),
  xlsx: z.string()
})

export type ExcelDto = z.infer<typeof ExcelSchema>
