import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LockedScreenComponent } from './modules/auth/components/locked-screen/locked-screen.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ServerComponent } from './modules/server-manager/server/components/server/server.component';
import { VirtualMachineComponent } from './modules/server-manager/virtual-machine/components/virtual-machine/virtual-machine.component';

const routes: Routes = [
  { path: 'auth', component: LockedScreenComponent },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'virtual-machine', component: VirtualMachineComponent, canActivate: [AuthGuard] },
      { path: 'server/:port', component: ServerComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/virtual-machine', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }