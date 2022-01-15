/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { delay } from 'rxjs/operators'
import Swal from 'sweetalert2'

import { Usuario } from '../../../models/usuario.model'
import { UsuarioService } from '../../../services/usuario.service'
import { SearchService } from '../../../services/search.service'
import { ModalImagenService } from '../../../services/modal-imagen.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0
  public users: Usuario[] = []
  public usersTemp: Usuario[] = []
  public desde: number = 0
  public isLoading: boolean = false
  public imgSubs!: Subscription

  constructor (
    private readonly usuarioService: UsuarioService,
    private readonly searchService: SearchService,
    private readonly modalImagenService: ModalImagenService
  ) { }

  ngOnInit (): void {
    this.cargarUsuarios()

    this.imgSubs = this.modalImagenService.newImg
    .pipe(delay(100))
    .subscribe(() => this.cargarUsuarios())
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
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

  deleteUser (usuario: Usuario): void {
    // Validar que el user actual, no sea el mismo que se va a eliminar
    if (usuario.uid === this.usuarioService.uid) {
      Swal.fire('Error', 'No puede eliminarse a si mismo', 'error')
      return
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.deleteUser(usuario)
          .subscribe(() => {
            Swal.fire(
              'Usuario borrado!',
              `${usuario.nombre} fue eliminado correctamente`,
              'success'
            )

            this.cargarUsuarios()
          })
      }
    })
  }

  changeRoleOf (user: Usuario): void {
    this.usuarioService.changeRoleUser(user).subscribe()
  }

  openModal (user: Usuario): void {
    this.modalImagenService.openModal('usuarios', user.uid ?? '', user.img)
  }
}
