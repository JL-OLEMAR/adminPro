import { Component, OnInit } from '@angular/core'
import { Usuario } from '../../../models/usuario.model'
import { UsuarioService } from '../../../services/usuario.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  public totalUsers: number = 0
  public users: Usuario[] = []

  constructor (private readonly usuarioService: UsuarioService) { }

  ngOnInit (): void {
    this.usuarioService.getAllUsers()
      .subscribe(({ usuarios, total }) => {
        this.users = usuarios
        this.totalUsers = total
      })
  }
}
