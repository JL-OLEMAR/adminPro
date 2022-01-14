import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { Usuario } from '../models/usuario.model'

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

  private transformarUsuarios (resultados: any[]): Usuario[] {
    return resultados.map((user: Usuario) => (
      new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid)
    ))
  }

  searchByTipo (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    termino: string = ''
  ): Observable<any> {
    const url = `${baseUrl}/todo/coleccion/${tipo}/${termino}`
    return this.http.get<any[]>(url, this.headers)
      .pipe(map((resp: any) => {
        if (tipo === 'usuarios') {
          return this.transformarUsuarios(resp.resultados)
        } else {
          return []
        }
      }))
  }
}
