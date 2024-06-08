import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { PageHeaderComponent } from './components/layouts/page-header/page-header.component';
import { SideNavComponent } from './components/layouts/side-nav/side-nav.component';

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
  title = 'ems-ui';

  isMenuClicked: boolean = false;
}
