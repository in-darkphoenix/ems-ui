import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { PageHeaderComponent } from './components/layouts/page-header/page-header.component';
import { SideNavComponent } from './components/layouts/side-nav/side-nav.component';
import { AuthApiService } from './pages/logins/auth-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MaterialModule,
    PageHeaderComponent,
    SideNavComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private authApiService: AuthApiService) {}
  title = 'ems-ui';

  isMenuClicked: boolean = false;

  catchEvent(componentReference: any) {
    // if (componentReference instanceof LoginsComponent) {
    //   componentReference.isAuthenticated.subscribe((res: any) => {
    //     this.isLoggedIn = res;
    //   });
    // }
  }

  getIsLoggedIn() {
    return this.authApiService.isLoggedIn();
  }
}
