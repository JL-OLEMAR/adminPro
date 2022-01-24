
export interface GetUserResponse {
  ok: boolean
  user: User[]
}

export interface User {
  nombre: string
  email: string
  img: string
  role: 'ADMIN_ROLE' | 'USER_ROLE'
  google: boolean
  uid: string
}
