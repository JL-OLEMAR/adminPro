/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/strict-boolean-expressions */
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { Usuario } from '../../models/usuario.model'
import { UsuarioService } from '../../services/usuario.service'
import { FileUploadService } from '../../services/file-upload.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  public perfilForm!: FormGroup
  public usuario!: Usuario
  public imagenSubir!: File

  constructor (
    private readonly fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private readonly fileUploadService: FileUploadService
  ) { this.usuario = usuarioService.usuario }

  ngOnInit (): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required, Validators.minLength(3)]],
      email: [this.usuario.email, [Validators.required, Validators.email]]
    })
  }

  actualizarPerfil (): any {
    this.usuarioService.actualizarUsuario(this.perfilForm.value)
      .subscribe(() => {
        const { nombre, email } = this.perfilForm.value
        this.usuario.nombre = nombre
        this.usuario.email = email
      })
  }

  cambiarImagen (event: any): void {
    const imgChoosed = event?.target?.files[0]
    if (imgChoosed ?? null) {
      this.imagenSubir = imgChoosed
    }
  }

  subirImagen (): void {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', (this.usuario.uid ? this.usuario.uid : ''))
  }
}
