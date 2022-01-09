/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, NgZone } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface'

const baseUrl: string = environment.baseUrl

declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any

  constructor (
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) { this.googleInit() }

  googleInit (): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '364111995335-ka02ni351tbt4n280d14bvl56ngfrq0r.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin'
      })
    })
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

  logout (): void {
    window.localStorage.removeItem('token')

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    })
  }
}
