export interface GetMedicoResp {
  ok: boolean
  medicos: Medico[]
}

export interface Medico {
  nombre: string
  usuario: _User
  hospital: _Hospital
  img?: string
}

interface _Hospital {
  _id: string
  nombre: string
  img: string
}

interface _User {
  _id: string
  nombre: string
  img: string
}
