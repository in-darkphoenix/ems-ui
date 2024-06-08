import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-confirm-dialogbox',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirm-dialogbox.component.html',
  styleUrl: './confirm-dialogbox.component.scss',
})
export class ConfirmDialogboxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public confirmDialogData: { title: string; message: string }
  ) {}
}
