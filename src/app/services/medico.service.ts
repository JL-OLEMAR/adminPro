import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { Medico, MedicosResponse } from '../interfaces/getAllMedicos.interface'

// Environment
const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor (private readonly _http: HttpClient) { }

  get token (): string {
    return window.localStorage.getItem('token') ?? ''
  }

  get headers (): any {
    return {
      headers: { 'x-token': this.token }
    }
  }

  // Service to get all doctors
  getDoctors (): Observable<Medico[]> {
    const url = `${baseUrl}/medicos`
    return this._http.get<MedicosResponse>(url, this.headers)
      .pipe(map((resp: any) => resp.medicos))
  }

  // Service to create a new doctor
  newDoctor (medico: Medico): Observable<any> {
    const url = `${baseUrl}/medicos`
    return this._http.post<MedicosResponse>(url, medico, this.headers)
  }

  // Service to update a doctor
  updateDoctor (medico: Medico): Observable<any> {
    const url = `${baseUrl}/medicos/${medico._id}`
    return this._http.put<MedicosResponse>(url, medico, this.headers)
  }

  // Service to delete a doctor by id
  deleteDoctor (_id: string): Observable<any> {
    const url = `${baseUrl}/medicos/${_id}`
    return this._http.delete(url, this.headers)
  }
}
