import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // constructor () { }

  async actualizarFoto (
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    uid: string
  ): Promise<boolean> {
    try {
      const url = `${baseUrl}/upload/${tipo}/${uid}`

      console.log(url)
      const formData = new FormData()
      formData.append('imagen', archivo)

      const resp = await window.fetch(url, {
        method: 'PUT',
        headers: { 'x-token': window.localStorage.getItem('token') ?? '' },
        body: formData
      })

      const data = await resp.json()
      return data
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
