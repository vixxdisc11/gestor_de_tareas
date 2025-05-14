import { Injectable } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {
  API_URL_AVISOS:any = 'http://127.0.0.1:8000/api/avisos'
  API_URL_GET_AVISOS:any = 'http://127.0.0.1:8000/api/avisos/'
  API_URL_GET_DECREASE:any = 'http://127.0.0.1:8000/api/decrease/'
  constructor(private http: HttpClient) { }
  createaviso(aviso:any):Promise<void>{
    return firstValueFrom(this.http.post<any>(this.API_URL_AVISOS , aviso))
  }
  getaviso(id:number):Promise<void>{
    return firstValueFrom(this.http.get<any>(this.API_URL_GET_AVISOS + id))
  }
  delete(id:number):Promise<void>{
    return firstValueFrom(this.http.delete<any>(this.API_URL_GET_AVISOS + id))
  }
  decrease(id:number, aviso:any):Promise<void>{
    return firstValueFrom(this.http.patch<any>(this.API_URL_GET_DECREASE + id , aviso))
  }



}
