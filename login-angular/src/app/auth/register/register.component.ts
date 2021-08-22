import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  hide: boolean;
  badRegister: boolean;
  loading: boolean;
  msg: string;

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
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  async register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      this.loading = true;
      const response = await this.authService.register(
        this.usernameField.value,
        this.emailField.value,
        this.passwordField.value
      );
      if (response) {
        this.msg = response.message;
      }
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.badRegister = true;
    }
  }

  get usernameField() {
    return this.form.get('username');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }
}
