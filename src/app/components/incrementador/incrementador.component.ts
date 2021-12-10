import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent {
  /* @Input('valor') progreso: number = 40 // Aquí se ha renombrado el atributo 'valor' a 'progreso' */
  @Input() progreso: number = 40

  cambiarValor (valor: number): number {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100
      return this.progreso
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0
      return this.progreso
    }

    this.progreso = this.progreso + valor
    return this.progreso
  }
}
