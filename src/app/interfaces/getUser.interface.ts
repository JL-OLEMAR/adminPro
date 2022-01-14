
export interface GetUserResponse {
  ok: boolean
  user: User[]
}

interface User {
  nombre: string
  email: string
  img: string
  role: string
  google: boolean
  uid: string
}
