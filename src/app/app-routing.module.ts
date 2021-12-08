import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// Modules
import { PagesRoutingModule } from './pages/pages.routing'
import { AuthRoutingModule } from './auth/auth.routing'

// Components
import { NopagefoundComponent } from './nopagefound/nopagefound.component'

const routes: Routes = [
  // path: '/dashboard' PagesRoutingModule
  // path: '/auth' AuthRoutingModule
  { path: '**', component: NopagefoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
