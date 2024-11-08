import z from 'zod'

export const UserSchema = z.object({
  client_id: z.number(),
  active: z.number(),
  client_name: z.string(),
  organization: z.string(),
  balance: z.number(),
  ppg_perc: z.number(),
  mngr_name: z.string(),
  mngr_phone: z.string(),
  error: z.number(),
  err_msg: z.string()
})

export type User = z.infer<typeof UserSchema>

export const LoginDto = z.object({
  email: z.string().email(),
  password: z.string()
})

export const LoginResponseSchema = z.object({
  client_id: z.number(),
  active: z.number(),
  auth_token: z.string(),
  token_exp_time: z.string(),
  error: z.number(),
  err_msg: z.string()
})

export type LoginDto = z.infer<typeof LoginDto>
export type LoginResponse = z.infer<typeof LoginResponseSchema>

export const RegisterDto = z.object({
  cname: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8, 'Пароль должен иметь 8 символов'),
  fio: z.string().min(1),
  phone: z
    .string()
    .regex(
      new RegExp('^\\+?[1-9]\\d{1,14}$'),
      'Ведите правильнный формат телефона (+380949175358)'
    ),
  telegram: z.string().min(1)
})

export const RegisterDtoFormSchema = z.object({
  data: RegisterDto,
  captcha: z.boolean(),
  agree: z.boolean()
})

export const RegisterResponseSchema = z.object({
  client_id: z.number(),
  error: z.number(),
  err_msg: z.string()
})

export type RegisterDto = z.infer<typeof RegisterDto>
export type RegisterDtoFormSchema = z.infer<typeof RegisterDtoFormSchema>
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>
