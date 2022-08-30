import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ClipboardModule } from 'ngx-clipboard';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LockedScreenComponent } from './auth/components/locked-screen/locked-screen.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { PortDetailComponent } from './port/components/port-detail/port-detail.component';
import { ServerComponent } from './server/components/server/server.component';
import { PlayersPipe } from './server/pipes/players.pipe';
import { ElapsedTimeComponent } from './shared/components/elapsed-time/elapsed-time.component';
import { AppHttpInterceptor } from './shared/http-interceptor';
import { UserDetailComponent } from './users/components/user-detail/user-detail.component';
import { VirtualMachineComponent } from './virtual-machine/components/virtual-machine/virtual-machine.component';
import { ElapsedTimePipe } from './virtual-machine/pipes/elapsed-time';
import { PortStatusPipe } from './virtual-machine/pipes/port-status.pipe';
import { VirtualMachineStatusPipe } from './virtual-machine/pipes/virtual-machine-status.pipe';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LockedScreenComponent,
    PortStatusPipe,
    ElapsedTimePipe,
    VirtualMachineStatusPipe,
    PlayersPipe,
    VirtualMachineComponent,
    ServerComponent,
    AppLayoutComponent,
    PortDetailComponent,
    UserDetailComponent,
    ElapsedTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClipboardModule,
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
    NzTagModule,
    NzToolTipModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
