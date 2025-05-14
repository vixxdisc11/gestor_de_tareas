import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaskService {
  tasks:any[];
  filtertasks:any[];
  readonly API_URLINDEX = 'http://127.0.0.1:8000/api/tasks';
  API_URLONCE = 'http://127.0.0.1:8000/api/tasks/';
  API_URLCOMMENT = 'http://127.0.0.1:8000/api/comments';
  API_URLDELCOMMENT = 'http://127.0.0.1:8000/api/comments/';
  API_URLCOMMENTUSER = 'http://127.0.0.1:8000/api/commentuser/';
  API_URLASIGN = 'http://127.0.0.1:8000/api/tasks/';
  API_URLUSERS = 'http://127.0.0.1:8000/api/users';
  API_URLUSERS2 = 'http://127.0.0.1:8000/api/users/';
  API_UNASIGN = 'http://127.0.0.1:8000/api/tasks/';
  API_ASIGN = 'http://127.0.0.1:8000/api/usertasks/';
  API_ASIGN2 = 'http://127.0.0.1:8000/api/delusertasks/';

  readonly API_URLSTATUS = 'http://127.0.0.1:8000/api/tasks/status/';

  constructor(private http: HttpClient) {
    this.tasks = [];
    this.filtertasks = [];

  }

  getcomments(){
    return firstValueFrom(this.http.get<any>(this.API_URLCOMMENT));
  }
  getcommentuser(id:number){
    return firstValueFrom(this.http.get<any>(this.API_URLCOMMENTUSER + id));
  }
  getusertasks(id:number){
    return firstValueFrom(this.http.get<any>(this.API_ASIGN + id));
  }
  createTask(tarea: any): Promise<any> {
    return firstValueFrom(this.http.post<any>(this.API_URLINDEX, tarea));
  };
  insertComment(comment : any): Promise<any> {
    return firstValueFrom(this.http.post<any>(this.API_URLCOMMENT, comment));
  };
  insertAssign(id:number,asign : any): Promise<any> {
    return firstValueFrom(this.http.post<any>(this.API_URLASIGN + id + '/assign', asign));
  };
  gettasks(){
    return firstValueFrom(this.http.get<any>(this.API_URLINDEX));
  };
  getUsers(){
    return firstValueFrom(this.http.get<any>(this.API_URLUSERS));
  };
  delUsers(taskid:any,id:any){
    return firstValueFrom(this.http.delete<any>(this.API_UNASIGN + taskid + '/' + id + '/unassign'));
  };
  delassigned(id:any){
    return firstValueFrom(this.http.delete<any>(this.API_ASIGN2+ id));
  };
// + '/unassign'
  getUnAssigned(id:number){
    return firstValueFrom(this.http.get<any>(this.API_URLONCE + id + '/notassigned'));
  };
  delcomment(id:number):Promise<void>{
    return firstValueFrom(this.http.delete<any>(this.API_URLDELCOMMENT + id ));
  };
  getUsersbyId(id:number){
    return firstValueFrom(this.http.get<any>(this.API_URLUSERS2 + id));
  };
  getAssigned(id:number){
    return firstValueFrom(this.http.get<any>(this.API_URLONCE + id + '/assigned'));
  };
  getDones(){
    return firstValueFrom(this.http.get<any>(this.API_URLSTATUS + 'Done'));
  }
  getDoings(){
    return firstValueFrom(this.http.get<any>(this.API_URLSTATUS + 'Doing'));
  }
  getNotStarted(){
    return firstValueFrom(this.http.get<any>(this.API_URLSTATUS + 'Not Started'));
  }
  getstatus(){
    return firstValueFrom(this.http.get<any>(this.API_URLSTATUS));
  };
  getTask(taskId:number){
    return firstValueFrom(this.http.get<any>(this.API_URLONCE + taskId));
  };
  editstatus(url:string, task:any):Promise<any>{
    return firstValueFrom(this.http.patch<any>(url, task));
  }


  deletetask(id:any):Promise<any> {
    return firstValueFrom(this.http.delete<any>(this.API_URLONCE + id));
  }
}
