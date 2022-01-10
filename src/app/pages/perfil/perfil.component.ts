import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup

  constructor (
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) { }

  ngOnInit (): void {
    this.perfilForm = this.fb.group({
      nombre: ['Luis Olemar', [Validators.required, Validators.minLength(3)]],
      email: ['test1@test.com', [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil (): void {
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(resp => {
        console.log(resp)
      })
  }
}
