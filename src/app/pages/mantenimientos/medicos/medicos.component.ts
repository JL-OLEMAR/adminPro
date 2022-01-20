import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { delay } from 'rxjs/operators'

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

  openSweetAlertForm (): void {}
}
