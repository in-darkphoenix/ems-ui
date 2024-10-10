import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'side-nav',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  navItems: {
    name: string;
    link: string;
  }[] = [
    { name: 'accounts', link: 'accounts' },
    { name: 'categories', link: 'categories' },
    { name: 'users', link: 'users' },
    { name: 'roles', link: 'roles' },
    { name: 'transactions', link: 'transactions' },
    { name: 'monthly summary', link: 'summaries' },
    { name: 'password manager', link: 'passwords' },
  ];
}
