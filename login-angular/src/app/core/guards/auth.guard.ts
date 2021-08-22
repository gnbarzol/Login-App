import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.verificarSesion();
  }

  async verificarSesion(): Promise<boolean | UrlTree> {
    if (this.authService.tokenIsExpired) {
      return this.router.parseUrl('/auth');
      // Llamar al refresh token si es que la api tiene esa funcionalidad
    }

    if (!this.authService.isLoggedIn) {
      return this.router.parseUrl('/auth');
    }

    console.log('DESDE GUARDIAN', this.authService.isLoggedIn);
    return this.authService.isLoggedIn;
  }

}
