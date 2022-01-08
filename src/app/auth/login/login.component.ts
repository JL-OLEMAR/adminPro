/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnInit } from '@angular/core'
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

  public loginForm: FormGroup = this.fb.group({
    // Extrae el email del localStorage o lo inicializa en null
    email: [window.localStorage.getItem('email'), [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  })

  constructor (
    private readonly router: Router,
    private readonly fb: FormBuilder,
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
      }, (err: any) => {
        Swal.fire('Error', err.error.msg, 'error')
      })

    // this.router.navigateByUrl('/')
  }

  onSuccess (googleUser: any): string {
    const idToken = googleUser.getAuthResponse().id_token
    console.log(idToken)
    return idToken
  }

  onFailure (error: any): any {
    console.log(error)
    return error
  }

  renderButton (): void {
    gapi.signin2.render('my-signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSuccess,
      onfailure: this.onFailure
    })
  }
}
