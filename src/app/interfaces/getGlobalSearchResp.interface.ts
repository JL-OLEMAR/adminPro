export interface GlobalSearchResp {
  ok: boolean
  usuarios: Usuario[]
  medicos: Medico[]
  hospitales: Hospital[]
}

export interface Usuario {
  nombre: string
  email: string
  role: 'ADMIN_ROLE' | 'USER_ROLE'
  google: boolean
  img: string
  uid: string
}

export interface Medico {
  _id: string
  nombre: string
  usuario: string
  hospital: string
  img: string
}

export interface Hospital {
  _id: string
  nombre: string
  usuario: string
  img: string
}
