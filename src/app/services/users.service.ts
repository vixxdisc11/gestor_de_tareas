import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  API_URLUSERS = 'http://127.0.0.1:8000/api/users/';
  API_URLADMIN = 'http://127.0.0.1:8000/api/users/admin/';
  constructor(private http: HttpClient) {

  }
  adminear(id:number){
    return firstValueFrom(this.http.get<any>(this.API_URLADMIN + id ))
  }
  deleteuser(id:number){
    return firstValueFrom(this.http.delete<any>(this.API_URLUSERS + id ))
  }
  getusers(){
    return firstValueFrom(this.http.get<any>(this.API_URLUSERS));
  }
}
