/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import Swal from 'sweetalert2'
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public formSubmitted: boolean = false

  public registerForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    terminos: [false, Validators.required]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  })

  constructor (
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) { }

  crearUsuario (): void {
    this.formSubmitted = true
    console.log(this.registerForm.value)

    if (this.registerForm.invalid) { return } // eslint-disable-line

    // Realizar el posteo
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe(resp => {
        console.log(resp)
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  campoNoValido (campo: string): boolean {
    if (this.registerForm.controls[campo].invalid && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  passwordNoValidas (): boolean {
    const pass1 = this.registerForm.controls['password'].value
    const pass2 = this.registerForm.controls['password2'].value

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }

  aceptaTerminos (): boolean {
    return (!(this.registerForm.controls['terminos'].value as boolean) && this.formSubmitted)
  }

  passwordsIguales (pass1Name: string, pass2Name: string): any {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name]
      const pass2Control = formGroup.controls[pass2Name]

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }
}
