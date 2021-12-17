/* eslint-disable no-constant-condition, prefer-promise-reject-errors */
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  ngOnInit (): void {
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hola mundo')
      } else {
        reject('Algo salió mal')
      }
    })

    promesa
      .then(console.log)
      .catch((error) => (console.log('Error en la promesa:', error)))

    console.log('Fin del init')
  }
}
