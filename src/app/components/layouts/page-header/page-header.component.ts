import { Component, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

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
}
