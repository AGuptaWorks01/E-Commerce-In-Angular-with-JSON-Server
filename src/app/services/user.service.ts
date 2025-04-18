import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Login, SignUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  inValidUserAuth = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: "response" }).subscribe((result) => {
      // console.warn(result)
      if (result) {
        // localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigateByUrl('/')
      }
    })
  }


  userLogin(data: Login) {
    this.http.get<Login[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body?.length) {
        // console.log("htis is data", data);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigateByUrl('/')
        this.inValidUserAuth.emit(false)
      } else {
        this.inValidUserAuth.emit(true)
      }
    })
  }

  // agar user login rahega toh wo login/signup pe nhi jaa payega isko hum user-auth me use krhe hai
  userAuthReload() {
    if (typeof window !== 'undefined' && localStorage.getItem('user')) {
      this.router.navigateByUrl('/')
    }
  }
}
