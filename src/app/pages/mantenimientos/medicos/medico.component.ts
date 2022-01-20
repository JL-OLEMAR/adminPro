import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'

import { Hospital } from '../../../interfaces/getAllHospitals.interface'
import { HospitalService } from '../../../services/hospital.service'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {
  public medicoForm!: FormGroup
  public hospitals: Hospital[] = []
  public hospitalSelect: Hospital | undefined
  private _hospitalSubs!: Subscription
  private _hospitalSelectSubs!: Subscription

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _hospitalService: HospitalService
  ) { }

  ngOnInit (): void {
    this.medicoForm = this._fb.group({
      nombre: ['Pepe', [Validators.required, Validators.minLength(3)]],
      hospital: ['', Validators.required]
    })
    this.getHospitals()

    this._hospitalSelectSubs = this.medicoForm.controls['hospital'].valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelect = this.hospitals.find(h => h._id === hospitalId)
      })
  }

  ngOnDestroy (): void {
    this._hospitalSubs.unsubscribe()
    this._hospitalSelectSubs.unsubscribe()
  }

  getHospitals (): void {
    this._hospitalSubs = this._hospitalService.getAllHospitals()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitals = hospitales
      })
  }

  guardarMedico (): void {
    console.log(this.medicoForm.value)
  }
}
