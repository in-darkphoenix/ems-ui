import { Component, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { AuthApiService } from '../../../pages/logins/auth-api.service';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  @Output()
  onMenuClick = new EventEmitter();

  constructor(private authApiService: AuthApiService) {}

  logout() {
    this.authApiService.logout();
  }

  getIsLoggedIn() {
    return this.authApiService.isLoggedIn();
  }
}
