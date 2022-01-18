export interface GetHospitalResp {
  ok: boolean
  hospital: Hospital
}

export interface Hospital {
  nombre: string
  usuario: _HospitalUser
  img: string
}

interface _HospitalUser {
  _id: string
  nombre: string
  img: string
}
