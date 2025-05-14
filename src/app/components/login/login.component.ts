import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
//import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {LogoutService} from '../../services/logout.service';
@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginform: FormGroup;
  email:FormControl;
  password:FormControl;
  protected isLoading:boolean = false;
  constructor(private loginService: AuthService,public router: Router) {
    this.email=new FormControl('');
    this.password=new FormControl('');
    this.loginform= new FormGroup({
      email:this.email,
      password:this.password,
    });
  }

  async login() {
    console.log(this.loginform.value)
    this.isLoading = true;
    await this.loginService.login(this.loginform.value);
    this.isLoading = false;
    await this.loginService.getinfo();
  }


}
