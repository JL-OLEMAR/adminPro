export interface MedicosResponse {
  ok: boolean
  medicos: Medico[]
}

export interface Medico {
  _id: string
  nombre: string
  usuario: Hospital
  hospital: Hospital
  img?: string
}

export interface Hospital {
  _id: string
  nombre: string
  img: string
}
