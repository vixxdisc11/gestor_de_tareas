import { Injectable } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  API_USERS = 'http://127.0.0.1:8000/api/users';
  constructor(private http: HttpClient) { }
  register(user:any):Promise<any> {
    return firstValueFrom(this.http.post<any>(this.API_USERS,user));
  }

}
