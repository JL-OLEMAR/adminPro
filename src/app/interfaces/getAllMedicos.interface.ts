export interface MedicosResponse {
  ok: boolean
  medico: Medico
}

export interface Medico {
  _id: string
  nombre: string
  usuario: User
  hospital: Hospital
  img?: string
}

export interface Hospital {
  _id: string
  nombre: string
  img: string
}

interface User {
  _id: string
  nombre: string
  img: string
}
