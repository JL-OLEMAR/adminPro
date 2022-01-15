import { Injectable, EventEmitter } from '@angular/core'
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _isModal: boolean = true
  public tipo!: 'usuarios' | 'medicos' | 'hospitales'
  public uid!: string
  public img!: string
  public newImg: EventEmitter<string> = new EventEmitter()

  get isModal (): boolean {
    return this._isModal
  }

  openModal (
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    uid: string,
    img: string = 'no-img'
  ): void {
    this._isModal = false
    this.tipo = tipo
    this.uid = uid

    if (img.includes('https')) {
      this.img = img
    } else {
      this.img = `${baseUrl}/upload/${tipo}/${img}`
    }
  }

  closeModal (): void {
    this._isModal = true
  }
}
