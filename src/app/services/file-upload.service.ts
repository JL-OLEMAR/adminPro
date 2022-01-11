import { Injectable } from '@angular/core'
import Swal from 'sweetalert2'
import { environment } from '../../environments/environment'

const baseUrl = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  async actualizarFoto (
    archivo: File,
    tipo: 'usuarios' | 'medicos' | 'hospitales',
    uid: string
  ): Promise<any> {
    try {
      const url = `${baseUrl}/upload/${tipo}/${uid}`

      const formData = new FormData()
      formData.append('imagen', archivo)

      const resp = await window.fetch(url, {
        method: 'PUT',
        headers: { 'x-token': window.localStorage.getItem('token') ?? '' },
        body: formData
      })

      const data = await resp.json()
      if (data.ok === true) {
        await Swal.fire('Guardado', data.msg, 'success')
        return data.nombreArchivo
      } else {
        await Swal.fire('Error', data.msg, 'error')
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
