import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

// Modules
import { SharedModule } from '../shared/shared.module'
import { ComponentsModule } from '../components/components.module'

// Components
import { PagesComponent } from './pages.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { Grafica1Component } from './grafica1/grafica1.component'
import { ProgressComponent } from './progress/progress.component'
import { PromesasComponent } from './promesas/promesas.component'
import { AccountSettingsComponent } from './account-settings/account-settings.component'

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    PromesasComponent,
    AccountSettingsComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PromesasComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
