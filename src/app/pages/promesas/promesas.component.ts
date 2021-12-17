/* eslint-disable @typescript-eslint/no-floating-promises, @typescript-eslint/promise-function-async */
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  ngOnInit (): void {
    this.getUsuarios()
      .then(usuario => console.log(usuario))
  }

  getUsuarios (): Promise<any> {
    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data))
    })
  }
}
