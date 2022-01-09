/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, NgZone, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/usuario.service'

declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmitted: boolean = false
  public auth2: any

  public loginForm: FormGroup = this.fb.group({
    // Extrae el email del localStorage o lo inicializa en null
    email: [window.localStorage.getItem('email'), [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor (
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly ngZone: NgZone,
    private readonly usuarioService: UsuarioService
  ) {}

  ngOnInit (): void {
    this.renderButton()
  }

  login (): void {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(() => {
        if ((this.loginForm.controls['remember'].value) === true) {
          localStorage.setItem('email', this.loginForm.controls['email'].value)
        } else {
          localStorage.removeItem('email')
        }

        // Navega al dashboard
        this.router.navigateByUrl('/')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  renderButton (): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark'
    })

    this.startApp()
  }

  // Método para loguearse con google
  async startApp (): Promise<void> {
    await this.usuarioService.googleInit()
    this.auth2 = this.usuarioService.auth2

    // Obtiene el id del btn de google desde el html
    this.attachSignin(document.getElementById('my-signin2'))
  }

  // Ataca el btn de google para obtier el token de google
  attachSignin (element: HTMLElement | null): void {
    // Al hacer click en el btn de google
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const idToken = googleUser.getAuthResponse().id_token
        this.usuarioService.loginGoogle(idToken)
          .subscribe(() => {
            this.ngZone.run(() => {
              // Navega al dashboard
              this.router.navigateByUrl('/')
            })
          })
      }, (error: any) => {
        // Manejo de errores
        alert(JSON.stringify(error, undefined, 2))
      })
  }
}
