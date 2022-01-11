import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { Usuario } from '../../models/usuario.model'
import { UsuarioService } from '../../services/usuario.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup
  public usuario!: Usuario

  constructor (
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService
  ) { this.usuario = usuarioService.usuario }

  ngOnInit (): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil (): void {
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value
        this.usuario.nombre = nombre
        this.usuario.email = email
      })
  }
}
