import { Component, OnInit } from '@angular/core'

/*
  La funcion customInitFuctions(), sirve para ejecutar funciones globales.
  la cual se encuentra en el path ./assets/js/custom.min.js
*/
declare function customInitFuctions (): void
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  ngOnInit (): void {
    customInitFuctions()
  }
}
