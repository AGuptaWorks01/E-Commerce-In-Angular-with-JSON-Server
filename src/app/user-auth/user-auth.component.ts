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
  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.userAuthReload()
  }

  signUp(data: SignUp) {
    this.user.userSignUp(data)
  }

  login(data: Login) {
    this.user.userLogin(data)
  }

  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }
}
