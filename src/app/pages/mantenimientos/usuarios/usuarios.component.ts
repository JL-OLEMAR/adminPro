import { Component, OnInit } from '@angular/core'
import { Usuario } from '../../../models/usuario.model'
import { UsuarioService } from '../../../services/usuario.service'
import { SearchService } from '../../../services/search.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  public totalUsers: number = 0
  public users: Usuario[] = []
  public usersTemp: Usuario[] = []
  public desde: number = 0
  public isLoading: boolean = false

  constructor (
    private readonly usuarioService: UsuarioService,
    private readonly searchService: SearchService
  ) { }

  ngOnInit (): void {
    this.cargarUsuarios()
  }

  cargarUsuarios (): void {
    this.isLoading = true
    this.usuarioService.getAllUsers(this.desde)
      .subscribe(({ usuarios, total }) => {
        this.usersTemp = usuarios
        this.users = usuarios
        this.totalUsers = total
        this.isLoading = false
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

  buscar (termino: string): void {
    if (termino.length === 0) {
      this.users = this.usersTemp
      return
    }

    this.searchService.searchByTipo('usuarios', termino)
      .subscribe(resultados => {
        this.users = resultados
      })
  }
}
