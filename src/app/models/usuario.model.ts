/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl

export class Usuario {
  constructor (
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public role?: string,
    public google?: boolean,
    public uid?: string
  ) {}

  get imagenUrl (): string | any {
    if (!this.img) {
      return `${baseUrl}/upload/usuarios/no-image`
    } else if (this.img.includes('https')) {
      return this.img
    } else {
      return `${baseUrl}/upload/usuarios/${this.img}`
    }
  }
}
