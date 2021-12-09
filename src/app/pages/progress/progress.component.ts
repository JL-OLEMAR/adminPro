import { Component } from '@angular/core'

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  progreso: number = 50

  get getPorcentaje (): string {
    return `${this.progreso}%`
  }

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
