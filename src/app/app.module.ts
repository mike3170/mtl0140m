import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MtlmastComponent } from './mtlmast/mtlmast.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MtlMastQueryComponent } from './mtlmast/mtlmast-query/mtlmast-query.component';
import { CodMastSearchComponent } from './codMast-search/codMast-search.component';
import { MtlKnd1SearchComponent } from './mtlknd1-search/mtlknd1-search.component';
import { MtlKnd2SearchComponent } from './mtlknd2-search/mtlknd2-search.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { BasvenmastComponent } from './basvenmast/basvenmast.component';
import { TestComponent } from './test/test.component';
import { BasCstMastSearchComponent } from './basCstMast-search/basCstMast-search.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { Pur0310mComponent } from './pur0310m/pur0310m.component';
import { MtlPurOrdeMComponent } from './pur0310m/mtl-pur-orde-m/mtl-pur-orde-m.component';
import { MtlPurOrdeDComponent } from './pur0310m/mtl-pur-orde-d/mtl-pur-orde-d.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToolBarComponent,
    MtlmastComponent,
    MtlMastQueryComponent,
    CodMastSearchComponent,
    BasCstMastSearchComponent,
    MtlKnd1SearchComponent,
    MtlKnd2SearchComponent,
    FooterBarComponent,
    BasvenmastComponent,
    TestComponent,
    MainComponent,
    MenuComponent,
    Pur0310mComponent,
    MtlPurOrdeMComponent,
    MtlPurOrdeDComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    CoreModule,
    AgGridModule
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
