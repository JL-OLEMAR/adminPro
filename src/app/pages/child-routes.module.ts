import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Guards
import { AdminGuard } from '../guards/admin.guard'

// Components
import { AccountSettingsComponent } from './account-settings/account-settings.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { Grafica1Component } from './grafica1/grafica1.component'
import { PerfilComponent } from './perfil/perfil.component'
import { ProgressComponent } from './progress/progress.component'
import { PromesasComponent } from './promesas/promesas.component'
import { RxjsComponent } from './rxjs/rxjs.component'
import { SearchComponent } from './search/search.component'

// Mantenimientos
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component'
import { MedicoComponent } from './mantenimientos/medicos/medico.component'
import { MedicosComponent } from './mantenimientos/medicos/medicos.component'
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component'

// childRoutes
const routes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' } },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
  { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
  { path: 'search/:termino', component: SearchComponent, data: { titulo: 'Searches' } },

  // Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de médico' } },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos' } },

  // Admin routes
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' } }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
