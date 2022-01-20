import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { Usuario } from '../models/usuario.model'
import { Hospital } from '../models/hospital.model'
import { User as UserInterface } from '../interfaces/getUser.interface'
import { Hospital as HospitalInterface } from '../interfaces/getHospital.interface'
import { Medico } from '../interfaces/getMedico.interface'

const baseUrl: string = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor (
    private readonly http: HttpClient
  ) { }

  get token (): string {
    return window.localStorage.getItem('token') ?? ''
  }

  get headers (): any {
    return {
      headers: { 'x-token': this.token }
    }
  }

  private transformarUsuarios (resultados: UserInterface[]): Usuario[] {
    return resultados.map((user: UserInterface) => (
      new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid)
    ))
  }

  private transformarHospitales (resultados: HospitalInterface[]): Hospital[] {
    return resultados
  }

  private transformarMedicos (resultados: Medico[]): Medico[] {
    return resultados
  }

  searchByTipo (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string = ''
  ): Observable<any[]> {
    const url = `${baseUrl}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(map((resp: any) => {
        if (tipo === 'usuarios') {
          return this.transformarUsuarios(resp.resultados)
        } else if (tipo === 'hospitales') {
          return this.transformarHospitales(resp.resultados)
        } else if (tipo === 'medicos') {
          return this.transformarMedicos(resp.resultados)
        } else {
          return []
        }
      }))
  }
}
