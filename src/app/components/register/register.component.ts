import { Component } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RegisterService} from '../../services/register.service';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoading:boolean = false;
  registerform: FormGroup;
  name:FormControl;
  email:FormControl;
  password:FormControl;
  constructor(public router: Router,public RegisterService: RegisterService) {

    this.name=new FormControl('');
    this.email=new FormControl('');
    this.password=new FormControl('');
  this.registerform= new FormGroup({
    name:this.name,
    email:this.email,
    password:this.password
  });
  }
  async registrar(){
    console.log(this.registerform.value);
    this.isLoading = true;
    await this.RegisterService.register(this.registerform.value);
    this.isLoading = false;
    this.router.navigate(['login']);
  }
  routerregister():void{
    this.router.navigate(['login']);
  }
}
