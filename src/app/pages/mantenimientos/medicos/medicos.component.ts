import { Component, OnInit } from '@angular/core'
import { MedicoService } from '../../../services/medico.service'

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  constructor (private readonly medicoService: MedicoService) { }

  ngOnInit (): void {
  }
}
