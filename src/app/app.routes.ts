import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MonthlySummariesComponent } from './pages/monthly-summaries/monthly-summaries.component';
import { PasswordsComponent } from './pages/passwords/passwords.component';
import { LoginsComponent } from './pages/logins/logins.component';

export const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'summaries', component: MonthlySummariesComponent },
  { path: 'passwords', component: PasswordsComponent },
  { path: 'login', component: LoginsComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
