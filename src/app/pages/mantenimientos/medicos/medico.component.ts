/* eslint-disable @typescript-eslint/no-floating-promises */
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
  public title: string = 'Create doctor'

  private _hospitalSubs!: Subscription
  private _hospitalSelectSubs!: Subscription

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
        if (medico !== undefined) {
          this.title = 'Update doctor'

          // Get data of the doctor select
          this.medicoSelect = medico

          // Fill in the form fields
          const { nombre, hospital: { _id } } = medico
          this.medicoForm.setValue({ nombre, hospital: _id })
        }
      }, () => {
        // If the id is not found, redirect to the list of doctors
        this._router.navigateByUrl('/dashboard/medicos')
      })
  }

  // Save or update the doctor
  guardarMedico (): void {
    const { nombre } = this.medicoForm.value

    if (this.medicoSelect !== undefined) {
      // Doctor update
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelect._id
      }

      this._medicoService.updateDoctor(data)
        .subscribe(() => {
          Swal.fire('Doctor updated', `${(nombre) as string}, has been successfully updated`, 'success')
        })
    } else {
      // Doctor create
      this.title = 'Create doctor'
      this._medicoService.newDoctor(this.medicoForm.value)
        .subscribe((resp: MedicosResponse) => {
          Swal.fire('Médico creado', `${(nombre) as string}, has been successfully created`, 'success')
          this._router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
    }
  }

  // Destroy the subscriptions
  ngOnDestroy (): void {
    this._hospitalSubs.unsubscribe()
    this._hospitalSelectSubs.unsubscribe()
  }
}
