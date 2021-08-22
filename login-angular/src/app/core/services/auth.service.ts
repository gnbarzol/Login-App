import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { LocalService } from './local.service';

import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenModel } from 'src/app/models/token.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected URL_API = 'http://localhost:3000/api';

  private token: TokenModel;

  isLoggedIn: boolean;

  constructor(
    private http: HttpClient,
    private localService: LocalService,
    private router: Router
  ) {
    this.isLoggedIn = !!this.getToken();
  }

  get tokenIsExpired(): boolean {
    return this.token?.isExpired;
  }

  getToken(): TokenModel {
    if (!this.token) {
      const token = this.localService.getJsonValue('token');
      if (token) {
        this.token = new TokenModel(token);
      }
    }
    return this.token;
  }

  login(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const body = new HttpParams()
          .set('email', username)
          .set('password', password);

        const authorization = btoa(`${username}:${password}`);

        const response: any = await this.http
          .post(`${this.URL_API}/auth/sign-in`, body, {
            
            headers: {
              'Authorization': `Basic ${authorization}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          .toPromise();

        this.token = new TokenModel(response);
        this.localService.setJsonValue('token', this.token);

        this.isLoggedIn = true;
        this.router.navigateByUrl('/');
        resolve(true);
      } catch (error: HttpErrorResponse | any) {
        this.errorOauthToken();
        if (error?.error?.statusCode == 401) {
          console.log('USUARIO INCORRECTO', error);
          resolve(false);
        } else {
          reject(error);
        }
      }
    });
  }

  register(username: string, email: string, password: string): Promise<any> {
    return this.http
      .post(`${this.URL_API}/auth/sign-up`, {
        username,
        email,
        password,
      })
      .toPromise();
  }

  cerrarSesion(): void {
    this.isLoggedIn = false;
    this.token = null;
    this.localService.clear();
    this.router.navigate(['auth']).then((_) => false);
  }

  private errorOauthToken(): void {
    this.isLoggedIn = false;
    this.token = null;
    this.localService.clear();
  }
}
