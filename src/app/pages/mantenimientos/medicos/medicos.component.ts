/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { delay } from 'rxjs/operators'
import Swal from 'sweetalert2'

import { Medico } from '../../../interfaces/getAllMedicos.interface'
import { MedicoService } from '../../../services/medico.service'
import { ModalImagenService } from '../../../services/modal-imagen.service'
import { SearchService } from '../../../services/search.service'

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {
  public medicos: Medico[] = []
  public medicosTemp: Medico[] = []
  public loading: boolean = false
  private _imgSubs!: Subscription

  constructor (
    private readonly _medicoService: MedicoService,
    private readonly _modalImagenService: ModalImagenService,
    private readonly _searchService: SearchService
  ) { }

  ngOnInit (): void {
    this.getDoctors()
    this._imgSubs = this._modalImagenService.newImg
      .pipe(delay(100))
      .subscribe(() => this.getDoctors())
  }

  ngOnDestroy (): void {
    this._imgSubs.unsubscribe()
  }

  searchMedico (termino: string): void {
    if (termino.length === 0) {
      this.medicos = this.medicosTemp
      return
    }
    this.loading = true
    this._searchService.searchByTipo('medicos', termino)
      .subscribe(medicos => {
        this.medicos = medicos
        this.loading = false
      })
  }

  getDoctors (): void {
    this.loading = true
    this._medicoService.getDoctors()
      .subscribe(medicos => {
        this.medicosTemp = medicos
        this.medicos = medicos
        this.loading = false
      })
  }

  openModal (medico: Medico): void {
    this._modalImagenService.openModal('medicos', medico._id, medico.img)
  }

  deleteMedico (medico: Medico): void {
    Swal.fire({
      title: '¿Borrar médico?',
      text: `Esta a punto de borrar a ${medico.nombre}!`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._medicoService.deleteDoctor(medico._id)
          .subscribe(() => {
            this.getDoctors()
            Swal.fire(
              'Médico borrado!',
              `${medico.nombre} fue eliminado correctamente`,
              'success'
            )
          })
      }
    })
  }
}
