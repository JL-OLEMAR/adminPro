import { Component, OnInit } from '@angular/core'
import { HospitalService } from '../../../services/hospital.service'

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  constructor (private readonly _hospitalService: HospitalService) { }

  ngOnInit (): void {
    this._hospitalService.getAllHospitals()
      .subscribe(hospitales => console.log(hospitales))
  }
}
