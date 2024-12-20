import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login, SignUp } from '../data-type';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  authError:string = '';
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload()
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data)
  }

  login(data: Login) {
    this.user.userLogin(data)
    this.user.inValidUserAuth.subscribe((result)=>{
      console.warn("isvaliauth", result);
      if(result){
        this.authError="Please enter valid details"
      }
    })
  }

  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }
}
