/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { delay } from 'rxjs/operators'
import Swal from 'sweetalert2'

import { Hospital } from '../../../models/hospital.model'
import { HospitalService } from '../../../services/hospital.service'
import { ModalImagenService } from '../../../services/modal-imagen.service'
import { SearchService } from '../../../services/search.service'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = []
  public hospitalsTemp: Hospital[] = []
  public loading: boolean = false
  public imgSubs!: Subscription

  constructor (
    private readonly _hospitalService: HospitalService,
    private readonly _modalImagenService: ModalImagenService,
    private readonly _searchService: SearchService
  ) { }

  ngOnInit (): void {
    this.getHospitals()

    this.imgSubs = this._modalImagenService.newImg
      .pipe(delay(100))
      .subscribe(() => this.getHospitals())
  }

  ngOnDestroy (): void {
    this.imgSubs.unsubscribe()
  }

  searchHospital (termino: string): void {
    if (termino.length === 0) {
      this.hospitales = this.hospitalsTemp
      return
    }

    this._searchService.searchByTipo('hospitales', termino)
      .subscribe((resultados: Hospital[]) => {
        this.hospitales = resultados
      })
  }

  getHospitals (): void {
    this.loading = true
    this._hospitalService.getAllHospitals()
      .subscribe(hospitales => {
        this.hospitalsTemp = hospitales
        this.hospitales = hospitales
        this.loading = false
      }
      )
  }

  editarHospital (hosp: Hospital): void {
    this._hospitalService.updateHospital(hosp._id ?? '', hosp.nombre)
      .subscribe(() => { Swal.fire('Hospital actualizado', hosp.nombre, 'success') })
  }

  deleteHospital (hosp: Hospital): void {
    this._hospitalService.deleteHospital(hosp._id ?? '')
      .subscribe(() => {
        this.getHospitals()
        Swal.fire('Hospital deleted', hosp.nombre, 'success')
      })
  }

  async openSweetAlertForm (): Promise<any> {
    const { value = '' } = await Swal.fire<string>({
      title: 'New hospital',
      text: 'Enter the name of the new hospital',
      input: 'text',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true
    })

    if (value.trim().length > 0) {
      this._hospitalService.newHospital(value)
        .subscribe((resp: any) => {
          this.hospitales.push(resp.hospital)
        })
    }
  }

  openModal (hosp: Hospital): void {
    this._modalImagenService.openModal('hospitales', hosp._id ?? '', hosp.img)
  }
}
