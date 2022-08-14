import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtivacoesComponent } from './ativacoes/components/ativacoes/ativacoes.component';
import { LockedScreenComponent } from './auth/components/locked-screen/locked-screen.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  { path: 'auth', component: LockedScreenComponent },
  { path: 'ativacoes', component: AtivacoesComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/ativacoes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }