export interface GetAllHospitalsResp {
  ok: boolean
  hospitales: Hospital[]
}

export interface Hospital {
  _id: string
  nombre: string
  usuario: _HospitalUser
  img: string
}

interface _HospitalUser {
  _id: string
  nombre: string
  img: string
}
