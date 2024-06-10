import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/layouts/page-not-found/page-not-found.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { MonthlySummariesComponent } from './pages/monthly-summaries/monthly-summaries.component';

export const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'summaries', component: MonthlySummariesComponent },
  { path: '', redirectTo: 'transactions', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
