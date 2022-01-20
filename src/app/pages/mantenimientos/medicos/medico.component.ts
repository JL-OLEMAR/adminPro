/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'

import { Hospital } from '../../../interfaces/getAllHospitals.interface'
import { Medico, MedicosResponse } from '../../../interfaces/getAllMedicos.interface'
import { HospitalService } from '../../../services/hospital.service'
import { MedicoService } from '../../../services/medico.service'

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {
  public medicoForm!: FormGroup
  public hospitals: Hospital[] = []
  public hospitalSelect: Hospital | undefined
  public medicoSelect: Medico | undefined

  private _hospitalSubs!: Subscription
  private _hospitalSelectSubs!: Subscription

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _hospitalService: HospitalService,
    private readonly _medicoService: MedicoService
  ) {}

  ngOnInit (): void {
    // The form is initialized with the form builder
    this.medicoForm = this._fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      hospital: ['', Validators.required]
    })

    // Get all hospitals
    this.getHospitals()

    // Get the selected hospital and then show the image
    this._hospitalSelectSubs = this.medicoForm.controls['hospital'].valueChanges
      .subscribe(hospitalId => {
        this.hospitalSelect = this.hospitals.find(h => h._id === hospitalId)
      })
  }

  // Destroy the subscriptions
  ngOnDestroy (): void {
    this._hospitalSubs.unsubscribe()
    this._hospitalSelectSubs.unsubscribe()
  }

  // Get all hospitals
  getHospitals (): void {
    this._hospitalSubs = this._hospitalService.getAllHospitals()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitals = hospitales
      })
  }

  // Save the doctor
  guardarMedico (): void {
    this._medicoService.newDoctor(this.medicoForm.value)
      .subscribe((resp: MedicosResponse) => {
        Swal.fire('Médico creado', `${resp.medico.nombre} ha sido creado con éxito`, 'success')
        this._router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })
  }
}
