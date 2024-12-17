import { Injectable } from '@angular/core';
import { Login, SignUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(user: SignUp) {
    this.http.post("http://localhost:3000/users", user, { observe: "response" }).subscribe((result) => {
      // console.warn(result)
      if (result) {
        localStorage.setItem('user', JSON.stringify(result.body))
        this.router.navigateByUrl('/')
      }
    })
  }


  userLogin(data: Login) {
    this.http.get<SignUp[]>(`http://localhost:3000/users?email=${data.email}.com&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        // console.log("htis is data", data);
        localStorage.setItem('user', JSON.stringify(result.body[0]));
        this.router.navigateByUrl('/')
      }
    })
  }

  // agar user login rahega toh wo login/signup pe nhi jaa payega isko hum user-auth me use krhe hai
  userAuthReload() {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('/')
    }
  }
}
