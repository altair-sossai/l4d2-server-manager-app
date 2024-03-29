import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LightgalleryModule } from 'lightgallery/angular/13';
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
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ClipboardModule } from 'ngx-clipboard';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LockedScreenComponent } from './modules/auth/components/locked-screen/locked-screen.component';
import { UserDetailComponent } from './modules/auth/users/components/user-detail/user-detail.component';
import { PortDetailComponent } from './modules/server-manager/port/components/port-detail/port-detail.component';
import { ServerComponent } from './modules/server-manager/server/components/server/server.component';
import { CampaignPipe } from './modules/server-manager/server/pipes/campaign.pipe';
import { PlayersPipe } from './modules/server-manager/server/pipes/players.pipe';
import { VirtualMachineComponent } from './modules/server-manager/virtual-machine/components/virtual-machine/virtual-machine.component';
import { ElapsedTimePipe } from './modules/server-manager/virtual-machine/pipes/elapsed-time';
import { PortStatusPipe } from './modules/server-manager/virtual-machine/pipes/port-status.pipe';
import { VirtualMachineStatusPipe } from './modules/server-manager/virtual-machine/pipes/virtual-machine-status.pipe';
import { ElapsedTimeComponent } from './shared/components/elapsed-time/elapsed-time.component';
import { AppHttpInterceptor } from './shared/http-interceptor';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    LockedScreenComponent,
    PortStatusPipe,
    ElapsedTimePipe,
    VirtualMachineStatusPipe,
    PlayersPipe,
    CampaignPipe,
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
    NzRadioModule,
    NzTabsModule,
    NzTableModule,
    LightgalleryModule,
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
