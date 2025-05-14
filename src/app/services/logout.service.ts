import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(public router: Router) {


  }
  delAuthToken():void{
    localStorage?.removeItem('token');
    this.router.navigate(['login']);
  }
}
