import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface'

const baseUrl: string = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor (private readonly http: HttpClient) { }

  validarToken (): Observable<boolean> {
    const token: string = window.localStorage.getItem('token') ?? ''
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((resp: any) => { window.localStorage.setItem('token', resp.token) }),
      map((resp: any) => { return resp.ok }),
      catchError(() => of(false)) // Atrapa el error y devuelve un observable de false
    )
  }

  crearUsuario (formData: RegisterForm): Observable<any> {
    return this.http.post(`${baseUrl}/usuarios`, formData)
      .pipe(tap((resp: any) => {
        window.localStorage.setItem('token', resp.token)
      }))
  }

  login (formData: LoginForm): Observable<any> {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(tap((resp: any) => {
        window.localStorage.setItem('token', resp.token)
      }))
  }

  loginGoogle (token: string): Observable<any> {
    return this.http.post(`${baseUrl}/login/google`, { token })
      .pipe(tap((resp: any) => {
        window.localStorage.setItem('token', resp.token)
      }))
  }
}
