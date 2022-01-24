import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = []

  // Obtiene el menu, desde el localStorage
  getMenu (): void {
    this.menu = JSON.parse(window.localStorage.getItem('menu') ?? '[]')
  }
}
