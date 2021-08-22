import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide: boolean;
  badLogin: boolean;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
    this.hide = true;
  }

  ngOnInit(): void {}

  createForm() {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  async login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      this.loading = true;

      const response = await this.authService.login(
        this.usernameField.value,
        this.passwordField.value
      );
      this.loading = false;

      if (response) {
        this.badLogin = false;
        console.log('INGRESO EXITOSO');
      } else {
        this.badLogin = true;
      }
    } catch (err) {
      this.loading = false;
      this.badLogin = true;
    }
  }

  async cerrar_sesion(): Promise<void> {
    this.authService.cerrarSesion();
  }

  get usernameField() {
    return this.form.get('username');
  }

  get passwordField() {
    return this.form.get('password');
  }
}
