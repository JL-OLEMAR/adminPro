import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'

import { AuthGuard } from '../guards/auth.guard'
import { PagesComponent } from './pages.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { Grafica1Component } from './grafica1/grafica1.component'
import { ProgressComponent } from './progress/progress.component'
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { PerfilComponent } from './perfil/perfil.component'

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component'
import { MedicoComponent } from './mantenimientos/medicos/medico.component'
import { MedicosComponent } from './mantenimientos/medicos/medicos.component'
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },

      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } },
      { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
      { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
      { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de médicos' } }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
