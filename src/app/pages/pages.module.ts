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
    PagesComponent,
    PerfilComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent,
    UsuariosComponent
  ],
  exports: [
    AccountSettingsComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    PerfilComponent,
    ProgressComponent,
    PromesasComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ComponentsModule
  ]
})
export class PagesModule { }
