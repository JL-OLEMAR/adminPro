import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

// Modules
import { SharedModule } from '../shared/shared.module'
import { ComponentsModule } from '../components/components.module'

// Components
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { Grafica1Component } from './grafica1/grafica1.component'
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component'
import { MedicosComponent } from './mantenimientos/medicos/medicos.component'
import { PagesComponent } from './pages.component'
import { PerfilComponent } from './perfil/perfil.component'
import { ProgressComponent } from './progress/progress.component'
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component'

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    HospitalesComponent,
    MedicosComponent,
    PagesComponent,
    PerfilComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ],
  exports: []
})
export class PagesModule { }
