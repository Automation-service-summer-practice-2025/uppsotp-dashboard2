import { Routes } from '@angular/router';
import { UserPage } from './pages/user-page/user-page';
import { AdminPage } from './pages/admin-page/admin-page';
import { LoginPage } from './pages/login-page/login-page';

export const routes: Routes = [
  { path: '', component: UserPage },
  { path: 'admin', component: AdminPage },
  { path: 'login', component: LoginPage },
];
