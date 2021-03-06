/* eslint-disable @typescript-eslint/no-floating-promises */
import { Injectable, NgZone } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { RegisterForm } from '../interfaces/register-form.interface'
import { LoginForm } from '../interfaces/login-form.interface'
import { GetAllUser } from '../interfaces/getAllUsers.interface'
import { GetUserResponse } from '../interfaces/getUser.interface'
import { UpdateUserForm } from '../interfaces/updateUser-form.interface'
import { Usuario } from '../models/usuario.model'

const { baseUrl, googleID } = environment

declare const gapi: any

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2: any
  public usuario!: Usuario

  constructor (
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly ngZone: NgZone
  ) { this.googleInit() }

  get token (): string {
    return window.localStorage.getItem('token') ?? ''
  }

  get headers (): any {
    return {
      headers: { 'x-token': this.token }
    }
  }

  get uid (): string {
    return this.usuario.uid ?? ''
  }

  get role (): 'ADMIN_ROLE' | 'USER_ROLE' {
    return this.usuario.role ?? 'USER_ROLE'
  }

  async googleInit (): Promise<any> {
    return await new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: `${googleID}`,
          cookiepolicy: 'single_host_origin'
        })

        resolve()
      })
    })
  }

  saveLocalStorage (token: string, menu: any): void {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('menu', JSON.stringify(menu))
  }

  crearUsuario (formData: RegisterForm): Observable<any> {
    return this.http.post(`${baseUrl}/usuarios`, formData)
      .pipe(tap((resp: any) => this.saveLocalStorage(resp.token, resp.menu)))
  }

  actualizarUsuario (user: UpdateUserForm): Observable<any> {
    user = { ...user, role: this.role }
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, user, this.headers)
  }

  changeRoleUser (user: Usuario): Observable<any> {
    return this.http.put<GetUserResponse>(`${baseUrl}/usuarios/${user.uid ?? ''}`, user, this.headers)
  }

  login (formData: LoginForm): Observable<any> {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(tap((resp: any) => this.saveLocalStorage(resp.token, resp.menu)))
  }

  loginGoogle (token: string): Observable<any> {
    return this.http.post(`${baseUrl}/login/google`, { token })
      .pipe(tap((resp: any) => this.saveLocalStorage(resp.token, resp.menu)))
  }

  validarToken (): Observable<boolean> {
    return this.http.get(`${baseUrl}/login/renew`, this.headers).pipe(
      map((resp: any) => {
        const { nombre, email, img = '', role, google, uid } = resp.usuario
        this.usuario = new Usuario(nombre, email, '', img, role, google, uid)

        this.saveLocalStorage(resp.token, resp.menu)
        return true
      }),
      catchError(() => { return of(false) }) // Atrapa el error y devuelve un observable de false
    )
  }

  logout (): void {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('menu')

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login')
      })
    })
  }

  getAllUsers (desde: number = 0): Observable<GetAllUser> {
    const url = `${baseUrl}/usuarios?desde=${desde}`
    return this.http.get<GetAllUser>(url, this.headers)
      .pipe(map((resp: any) => {
        const usuarios = resp.usuarios.map((user: Usuario) => (
          new Usuario(user.nombre, user.email, '', user.img, user.role, user.google, user.uid)
        ))

        return {
          total: resp.total,
          usuarios
        }
      }))
  }

  deleteUser (usuario: Usuario): Observable<any> {
    const url = `${baseUrl}/usuarios/${usuario.uid ?? ''}`
    return this.http.delete(url, this.headers)
  }
}
