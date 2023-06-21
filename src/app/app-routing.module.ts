import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BasvenmastComponent } from './basvenmast/basvenmast.component';
import { LoginGuard } from './core/auth/login.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { MtlmastComponent } from './mtlmast/mtlmast.component';
import { Pur0310mComponent } from './pur0310m/pur0310m.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },  
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, canActivate: [LoginGuard] },
  { path: "menu", component: MenuComponent, canActivate: [LoginGuard] },  
  { path: "mtlmast", component: MtlmastComponent, canActivate: [LoginGuard]},
  { path: "basvenmast", component: BasvenmastComponent, canActivate: [LoginGuard]},
  { path: "pur0310m", component: Pur0310mComponent, canActivate: [LoginGuard]},
  { path: "test", component: TestComponent},
  { path: "**", component: NotFoundComponent},

  // { path: "", redirectTo: "login", pathMatch: "full" },
  // { path: "login", component: LoginComponent },  
  // {
  //   path: "main", component: MainComponent, canActivateChild: [
  //     LoginGuard
  //   ],
  //   children: [
  //     { path: "mtlmast", component: MtlmastComponent },
  //     { path: "basvenmast", component: BasvenmastComponent },
  //     { path: "test", component: TestComponent },
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
