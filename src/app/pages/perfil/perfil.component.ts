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
  public usuario: Usuario
  public imagenSubir!: File
  public imgTemp!: any

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
    const file = event?.target?.files[0]
    if (!file || file.type.indexOf('image') < 0) {
      this.imgTemp = null
    }
    this.imagenSubir = file

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  subirImagen (): void {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', (this.usuario.uid ?? ''))
      .then(img => { this.usuario.img = img })
  }
}
