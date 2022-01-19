import { Component, OnInit } from '@angular/core'

import { Medico } from '../../../interfaces/getAllMedicos.interface'
import { MedicoService } from '../../../services/medico.service'
import { ModalImagenService } from '../../../services/modal-imagen.service'

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[] = []
  public medicosTemp: Medico[] = []
  public loading: boolean = false

  constructor (
    private readonly _medicoService: MedicoService,
    private readonly _modalImagenService: ModalImagenService
  ) { }

  ngOnInit (): void {
    this.getDoctors()
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
}
