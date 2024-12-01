import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import moment from 'moment';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { AuthApiService } from './auth-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILoginRequestBody, ILoginResponse } from '../../types/login.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logins',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './logins.component.html',
  styleUrl: './logins.component.scss',
})
export class LoginsComponent {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private authApiService: AuthApiService
  ) {}

  @Output()
  isAuthenticated = new EventEmitter<boolean>();

  loginForm: FormGroup = this.fb.group({
    user_id: this.fb.control('0'),
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  login() {
    const loginFormInput: ILoginRequestBody = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.authApiService.loginUser(loginFormInput).subscribe({
      next: (res) => {
        if (res.id_token && res.expires_in) {
          this.setSession(res);
        }
        this.snackBar.open(res.message, 'Dismiss', {
          duration: 2000,
        });
        this.router.navigate(['transactions']);
        this.isAuthenticated.emit(true);
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'Dismiss', {
          duration: 2000,
        });
        this.isAuthenticated.emit(false);
      },
    });
  }

  private setSession(authResult: ILoginResponse) {
    const expiresAt = moment().add(authResult.expires_in, 'minute');

    localStorage.setItem('id_token', authResult.id_token);
    localStorage.setItem('expires_in', JSON.stringify(expiresAt.valueOf()));
  }
}
