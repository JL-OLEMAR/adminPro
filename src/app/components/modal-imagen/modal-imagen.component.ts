/* eslint-disable @typescript-eslint/no-floating-promises */
import { Component } from '@angular/core'
import { ModalImagenService } from '../../services/modal-imagen.service'
import { FileUploadService } from '../../services/file-upload.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent {
  public imagenSubir!: File
  public imgTemp!: any

  constructor (
    public modalImagenService: ModalImagenService,
    public fileUploadService: FileUploadService
  ) { }

  closeModal (): void {
    this.imgTemp = null
    this.modalImagenService.closeModal()
  }

  cambiarImagen (event: any): void {
    const file = event?.target?.files[0]
    if (file === null) {
      this.imgTemp = null
      return
    }

    this.imagenSubir = file

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  subirImagen (): void {
    const { uid, tipo } = this.modalImagenService

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, uid)
      .then((img) => {
        Swal.fire('Guardado', 'Imagen actualizada', 'success')
        this.modalImagenService.newImg.emit(img)
        this.closeModal()
      })
      .catch(() => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      })
  }
}
