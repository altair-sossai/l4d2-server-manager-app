import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockedScreenComponent } from './auth/components/locked-screen/locked-screen.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { ServerComponent } from './server/components/server/server.component';
import { VirtualMachineComponent } from './virtual-machine/components/virtual-machine/virtual-machine.component';

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