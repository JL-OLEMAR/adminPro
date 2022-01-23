import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Usuario, Medico, Hospital } from '../../interfaces/getGlobalSearchResp.interface'
import { SearchService } from '../../services/search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  public hospitales: Hospital[] = []
  public medicos: Medico[] = []
  public usuarios: Usuario[] = []

  constructor (
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _searchService: SearchService
  ) { }

  ngOnInit (): void {
    this._activatedRoute.params
      .subscribe(({ termino }) => this.globalSearch(termino))
  }

  globalSearch (termino: string): void {
    this._searchService.globalSearch(termino)
      .subscribe((resp: any) => {
        this.hospitales = resp.hospitales
        this.medicos = resp.medicos
        this.usuarios = resp.usuarios
      })
  }
}
