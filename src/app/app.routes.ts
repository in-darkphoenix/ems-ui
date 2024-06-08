import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { AccountsComponent } from './pages/accounts/accounts.component';

export const routes: Routes = [
  { path: 'account', component: AccountsComponent },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
