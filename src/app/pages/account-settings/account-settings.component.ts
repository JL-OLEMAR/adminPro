import { Component } from '@angular/core'

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent {
  public linkTheme: Element | null = document.querySelector('#theme')

  changeTheme (theme: string): void {
    const url = `./assets/css/colors/${theme}.css`

    if (url !== null && this.linkTheme !== null) {
      localStorage.setItem('theme', url)
      return this.linkTheme.setAttribute('href', url)
    }
  }
}
