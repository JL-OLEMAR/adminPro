
export interface GetUserResponse {
  ok: boolean
  user: User[]
}

export interface User {
  nombre: string
  email: string
  img: string
  role: string
  google: boolean
  uid: string
}
