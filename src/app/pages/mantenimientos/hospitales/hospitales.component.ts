import { Component, OnInit } from '@angular/core'
import { Hospital } from '../../../models/hospital.model'
import { HospitalService } from '../../../services/hospital.service'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[] = []
  public loading: boolean = false

  constructor (private readonly _hospitalService: HospitalService) { }

  ngOnInit (): void {
    this.getHospitals()
  }

  getHospitals (): void {
    this.loading = true
    this._hospitalService.getAllHospitals()
      .subscribe(hospitales => {
        this.hospitales = hospitales
        this.loading = false
      }
      )
  }
}
