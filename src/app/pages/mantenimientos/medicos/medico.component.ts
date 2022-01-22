/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/strict-boolean-expressions */
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'
import { delay } from 'rxjs/operators'
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
  private _newDoctorSubs!: Subscription
  private _updateDoctorSubs!: Subscription

  constructor (
    private readonly _fb: FormBuilder,
    private readonly _router: Router,
    private readonly _hospitalService: HospitalService,
    private readonly _medicoService: MedicoService,
    private readonly _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit (): void {
    // Get id from url(params)
    this._activatedRoute.params
      .subscribe(({ id }) => this.getDoctorOf(id))

    // this._medicoService.getDoctorById()

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
    this._newDoctorSubs.unsubscribe()
    this._updateDoctorSubs.unsubscribe()
  }

  // Get all hospitals
  getHospitals (): void {
    this._hospitalSubs = this._hospitalService.getAllHospitals()
      .subscribe((hospitales: Hospital[]) => {
        this.hospitals = hospitales
      })
  }

  // Get doctor by id
  getDoctorOf (id: string): void {
    if (id === 'nuevo') { return }

    this._medicoService.getDoctorById(id)
      .pipe(delay(100))
      .subscribe((medico: Medico) => {
        if (!medico) {
          this._router.navigateByUrl('/dashboard/medicos')
        } else {
          // Get data of the doctor select
          this.medicoSelect = medico

          // Fill in the form fields
          const { nombre, hospital: { _id } } = medico
          this.medicoForm.setValue({ nombre, hospital: _id })
        }
      })
  }

  // Save the doctor
  guardarMedico (): void {
    if (this.medicoSelect) {
      // Doctor update
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelect._id
      }

      this._updateDoctorSubs = this._medicoService.updateDoctor(data)
        .subscribe((resp: MedicosResponse) => {
          Swal.fire('Doctor updated', `${resp.medico.nombre}, has been successfully updated`, 'success')
        })
    } else {
      // Doctor create
      this._newDoctorSubs = this._medicoService.newDoctor(this.medicoForm.value)
        .subscribe((resp: MedicosResponse) => {
          Swal.fire('Médico creado', `${resp.medico.nombre}, has been successfully created`, 'success')
          this._router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
    }
  }
}
