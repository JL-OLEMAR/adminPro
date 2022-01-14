import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: []
})
export class ModalImagenComponent implements OnInit {
  public isShowModal: boolean = false

  // constructor () { }

  ngOnInit (): void {
  }

  closeModal (): void {
    this.isShowModal = true
  }
}
