import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';

import en from '@angular/common/locales/en';

import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorComponent } from './pages/indicator/indicator.component';
import { TermsofuseComponent } from './pages/termsofuse/termsofuse.component';
import { DataprotectionComponent } from './pages/dataprotection/dataprotection.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ImprintComponent } from './pages/imprint/imprint.component';

registerLocaleData(en);

const routes: Routes = [
  { path:'dataprotection', component: DataprotectionComponent },
  { path:'terms', component: TermsofuseComponent },
  { path:'imprint', component: ImprintComponent },
  { path:'signin', component: SigninComponent },
  { path:'signup', component: SignupComponent },
  { path:'', component: IndicatorComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    IndicatorComponent,
    HomeComponent,
    TermsofuseComponent,
    DataprotectionComponent,
    SigninComponent,
    SignupComponent,
    ImprintComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzGridModule,
    NzUploadModule,
    NzMessageModule,
    NzListModule,
    NzTagModule,
    NzButtonModule,
    NzTableModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }