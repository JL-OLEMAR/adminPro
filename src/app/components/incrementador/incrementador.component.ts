import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent {
  // @Input() progreso: number = 40
  @Input('valor') progreso: number = 40 // Desde el padre al hijo
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter() // desde el hijo al padre

  cambiarValor (valor: number): any {
    if (this.progreso >= 100 && valor >= 0) {
      this.progreso = 100
      this.valorSalida.emit(100)
      return this.progreso
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0
      this.valorSalida.emit(0)
      return this.progreso
    }

    this.progreso = this.progreso + valor
    this.valorSalida.emit(this.progreso)

    // return (this.progreso)
  }
}
