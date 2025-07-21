import type { User } from '../dto'

export interface LoginResponse {
  user: User
  accessToken: string
}
