import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {AuthService} from '../services/auth.service';
@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(public loginService: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.loginService.isLogged()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
