import { Routes } from '@angular/router';
import {LoginComponent} from "./Components/login/login.component";
import {AuthGuard} from "./Guard/auth.guard";
import {SecureInnerPagesGuard} from "./Guard/secure-inner-pages.guard";
import {CvaeComponent} from "./Components/dashboard/cvae/cvae.component";
import {CfeComponent} from "./Components/dashboard/cfe/cfe.component";
import {TvaComponent} from "./Components/dashboard/tva/tva.component";
import {DashboardComponent} from "./Components/dashboard/dashboard.component";
import {ProfileComponent} from "./Components/dashboard/profile/profile.component";
import {TransactionComponent} from "./Components/dashboard/transaction/transaction.component";
import {HistoriqueComponent} from "./Components/dashboard/historique/historique.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [SecureInnerPagesGuard] },
  {
    path: 'Dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'cvae', component: CvaeComponent, canActivate: [AuthGuard] },
      { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard] },
      { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard] },
      { path: 'cfe', component: CfeComponent, canActivate: [AuthGuard] },
      { path: 'tva', component: TvaComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'cvae', pathMatch: 'full' },
      {
        path : 'Profile' ,
        component : ProfileComponent,
        canActivate : [AuthGuard],
        // data: {
        //   r  ole: ['Admin','User']
        // }
      }
    ]
  },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "**", redirectTo: "login", pathMatch: "full" }
];
