import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {TableComponent} from "./components/table/table.component";
import {AuthGuard} from "./security/auth.guard";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {UserTableComponent} from "./components/user-table/user-table.component";

const routes: Routes = [
  { path: '', component: TableComponent, pathMatch: "full", canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'change-password', component: ChangePasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'user', component: UserTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
