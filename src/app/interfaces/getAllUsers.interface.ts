import { Usuario } from '../models/usuario.model'

export interface GetAllUser {
  total: number
  usuarios: Usuario[]
}
