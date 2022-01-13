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
  public desde: number = 0

  constructor (private readonly usuarioService: UsuarioService) { }

  ngOnInit (): void {
    this.cargarUsuarios()
  }

  cargarUsuarios (): void {
    this.usuarioService.getAllUsers(this.desde)
      .subscribe(({ usuarios, total }) => {
        this.users = usuarios
        this.totalUsers = total
      })
  }

  cambiarPagina (valor: number): any {
    this.desde += valor

    if (this.desde < 0) {
      this.desde = 0
    } else if (this.desde >= this.totalUsers) {
      this.desde -= valor
    }

    this.cargarUsuarios()
  }
}
