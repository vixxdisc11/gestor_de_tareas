import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly API_URL = 'http://127.0.0.1:8000/api/';
  readonly API_URL_LOGIN = this.API_URL + 'login';
  readonly API_URL_ID = this.API_URL + 'id';
  constructor(
    private http: HttpClient,
  private router: Router

  ) {
  }
  login(log:any):Promise<any> {
    return firstValueFrom(
      this.http.post<any>(this.API_URL_LOGIN, log)
    ).then((res) => {
      const token = res.token;
      localStorage.setItem('token', token);
      this.router.navigateByUrl('tasks').then();
      console.log(localStorage.getItem('token'))
    });
  }

  getinfo(): Promise<any> {
    const token = localStorage.getItem('token');

    return firstValueFrom(
      this.http.get<any>(this.API_URL_LOGIN, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    );
  }

  getAuthToken():string|null {
    return localStorage?.getItem('token');
  }

  isLogged():boolean {
    return !!localStorage.getItem('token');
  }
}
