import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public registerForm = this.fb.group({
    nombre: ['Pepe', [Validators.required, Validators.minLength(3)]],
    email: ['test100@test.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [false, Validators.required]
  })

  constructor (private readonly fb: FormBuilder) { }

  crearUsuario (): void {
    console.log(this.registerForm.value)
  }
}
