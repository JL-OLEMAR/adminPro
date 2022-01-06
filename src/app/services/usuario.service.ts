import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { RegisterForm } from '../interfaces/register-form.interface'
import { environment } from '../../environments/environment'

const baseUrl: string = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor (private readonly http: HttpClient) { }

  crearUsuario (formData: RegisterForm): Observable<any> {
    return this.http.post(`${baseUrl}/usuarios`, formData)
  }
}
