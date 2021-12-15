import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly linkTheme: Element | null = document.querySelector('#theme')

  constructor () {
    const url = localStorage.getItem('theme') ?? './assets/css/colors/purple-dark.css'
    if (this.linkTheme !== null) {
      this.linkTheme.setAttribute('href', url)
    }
  }

  changeTheme (theme: string): void {
    const url = `./assets/css/colors/${theme}.css`

    if (url !== null && this.linkTheme !== null) {
      localStorage.setItem('theme', url)
      this.linkTheme.setAttribute('href', url)
      this.checkCurrentTheme()
    }
  }

  checkCurrentTheme (): void {
    const links = document.querySelectorAll('.selector')

    links.forEach((elem: Element) => {
      elem.classList.remove('working')

      const btnTheme = elem.getAttribute('data-theme')
      const btnThemeUrl = `./assets/css/colors/${(btnTheme as string)}.css`

      if (this.linkTheme !== null) {
        const currentThemeUrl = this.linkTheme.getAttribute('href')
        if (btnThemeUrl === currentThemeUrl) {
          elem.classList.add('working')
        }
      }
    })
  }
}
