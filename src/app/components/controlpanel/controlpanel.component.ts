import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import { Router, RouterLink} from '@angular/router';
@Component({
  selector: 'app-controlpanel',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './controlpanel.component.html',
  styleUrl: './controlpanel.component.css'
})
export class ControlpanelComponent implements OnInit{
  users:any;


constructor(public UsersService:UsersService,public router: Router) {

}
  ngOnInit(): void {
  this.getusers();
  }
  async deleteuser(id:number){
    await this.UsersService.deleteuser(id);
    this.getusers();
  }
  async changeadmin (id:any){
    await this.UsersService.adminear(id);
    this.getusers();
  }
  tasks():void{
    this.router.navigate(['tasks']);
  }

async getusers(){
  this.users = await this.UsersService.getusers();
}
}
