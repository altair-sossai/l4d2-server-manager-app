import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AtivacaoEditComponent } from './ativacoes/components/ativacao-edit/ativacao-edit.component';
import { AtivacaoItemComponent } from './ativacoes/components/ativacao-item/ativacao-item.component';
import { AtivacoesComponent } from './ativacoes/components/ativacoes/ativacoes.component';
import { CepPipe } from './ativacoes/pipes/cep.pipe';
import { StatusPipe } from './ativacoes/pipes/status.pipe';
import { LockedScreenComponent } from './auth/components/locked-screen/locked-screen.component';
import { AppHttpInterceptor } from './shared/http-interceptor';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    AtivacaoItemComponent,
    StatusPipe,
    AtivacoesComponent,
    LockedScreenComponent,
    AtivacaoEditComponent,
    CepPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzResultModule,
    NzButtonModule,
    NzIconModule,
    NzEmptyModule,
    NzSkeletonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzMessageModule,
    NzDividerModule,
    NzSelectModule,
    NzCollapseModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
