import {Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {SetPasswordComponent} from "./set-password/set-password.component";

export const authRoutes: Routes = [
  { path: '',
    component: AuthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignUpComponent
  },
  {
    path: 'set-password',
    component: SetPasswordComponent
  }
]
