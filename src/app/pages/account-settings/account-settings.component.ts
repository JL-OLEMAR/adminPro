import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  public linkTheme: Element | null = document.querySelector('#theme')
  public links!: NodeListOf<Element>

  ngOnInit (): void {
    this.links = document.querySelectorAll('.selector')
    this.checkCurrentTheme()
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
    this.links.forEach((elem: Element) => {
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
