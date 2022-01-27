import { Component, OnInit } from '@angular/core'
import { SettingsService } from '../services/settings.service'
import { SidebarService } from '../services/sidebar.service'

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
  year: number = new Date().getFullYear()

  // settingsService: muestra el thema por defecto
  constructor (
    private readonly _settingsService: SettingsService,
    private readonly _sidebarService: SidebarService
  ) {}

  ngOnInit (): void {
    customInitFuctions()
    this._sidebarService.getMenu()
  }
}
