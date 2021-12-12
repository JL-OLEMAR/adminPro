import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ChartsModule } from 'ng2-charts'

import { IncrementadorComponent } from './incrementador/incrementador.component'
import { DoughnutComponent } from './doughnut/doughnut.component'

@NgModule({
  declarations: [
    IncrementadorComponent,
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DoughnutComponent
  ]
})
export class ComponentsModule { }
