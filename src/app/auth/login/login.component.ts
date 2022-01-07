/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public formSubmitted: boolean = false

  public loginForm: FormGroup = this.fb.group({
    email: ['test100@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [false]
  })

  constructor (
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) { }

  login (): void {
    this.usuarioService.login(this.loginForm.value)
      .subscribe(resp => {
        console.log(resp)
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })

    // this.router.navigateByUrl('/')
  }
}
