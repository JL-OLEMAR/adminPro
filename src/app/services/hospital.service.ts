import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { Hospital, GetAllHospitalsResp } from '../interfaces/getAllHospitals.interface'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor (private readonly http: HttpClient) {}

  get token (): string {
    return window.localStorage.getItem('token') ?? ''
  }

  get headers (): any {
    return {
      headers: { 'x-token': this.token }
    }
  }

  getAllHospitals (): Observable<Hospital> {
    const url = `${baseUrl}/hospitales`
    return this.http.get<GetAllHospitalsResp>(url, this.headers)
      .pipe(map((resp: any) => resp.hospitales))
  }
}
