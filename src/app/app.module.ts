import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

import { registerLocaleData, APP_BASE_HREF } from '@angular/common';

import en from '@angular/common/locales/en';

import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { DataprotectionComponent } from './pages/dataprotection/dataprotection.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ImprintComponent } from './pages/imprint/imprint.component';
import { SelectdocumentComponent } from './pages/indicator/selectdocument/selectdocument.component';
import { ScanResultComponent } from './pages/indicator/scanresult/scanresult.component';
import { VisualisationresultComponent } from './pages/indicator/visualisationresult/visualisationresult.component';
import { DownloadResultComponent } from './pages/indicator/downloadresult/downloadresult.component';
import { DialogComponent } from './dialog/dialog.component';
import { AuthGuard } from './utils/auth.guard';
import { JwtInterceptor } from './utils/auth/jwt.interceptor';
import { DefaultInterceptor } from './utils/http/default.interceptor';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzFormModule } from 'ng-zorro-antd/form';
import {ResponseJwtInterceptor} from './utils/auth/response-jwt.interceptor';
import {InvalidJwtInterceptor} from './utils/auth/invalid-jwt.interceptor';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import {RxStompService, InjectableRxStompConfig, rxStompServiceFactory} from '@stomp/ng2-stompjs';
import {rxStompConfig} from './configuration/rxstomp.config'
import { NotFoundComponent } from './pages/notfound/notfound.component';
import { ErrorHandlerService } from './services/errorhandler.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { ResultComponent } from './pages/indicator/result/result.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { IndicatorsUploadModule } from './indicators-upload/indicators-upload.module';

registerLocaleData(en);

export const routes: Routes = [
  { path: 'dataprotection', component: DataprotectionComponent },
  { path: 'terms', component: TermsofuseComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'login', component: SigninComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  {
    path: 'manage-indicators',
    loadChildren: () =>
      import('./manage-indicators/manage-indicators.module').then(
        (m) => m.ManageIndicatorsModule
      ),
  },
  {
    path: 'user-management',
    loadChildren: () =>
      import('./user-management/user-management.module').then(
        (m) => m.UserManagementModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '', component: IndicatorComponent },
  { path: '**', component: NotFoundComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    IndicatorComponent,
    DialogComponent,
    HomeComponent,
    TermsofuseComponent,
    DataprotectionComponent,
    SigninComponent,
    SignupComponent,
    ImprintComponent,
    SelectdocumentComponent,
    ScanResultComponent,
    VisualisationresultComponent,
    DownloadResultComponent,
    NotFoundComponent,
    ResultComponent
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzGridModule,
    NzUploadModule,
    NzMessageModule,
    NzListModule,
    NzTagModule,
    NzButtonModule,
    NzSpinModule,
    NzTableModule,
    NzStepsModule,
    NzProgressModule,
    NzAlertModule,
    NzMenuModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzSliderModule,
    NzIconModule,
    NzCollapseModule,
    NzModalModule,
    NzBadgeModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzDropDownModule,
    NzDatePickerModule,
    IndicatorsUploadModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DefaultInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidJwtInterceptor,
      multi: true
    },
    {
      provide: InjectableRxStompConfig,
      useValue: rxStompConfig
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseJwtInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService
    }
  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
