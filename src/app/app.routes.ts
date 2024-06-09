import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CategoriesComponent } from './pages/categories/categories.component';

export const routes: Routes = [
  { path: 'account', component: AccountsComponent },
  { path: 'category', component: CategoriesComponent },
  { path: '', redirectTo: 'account', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
