import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Login, SignUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  showLogin = false;
  constructor(private seller: SellerService) {}

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  openLogin() {
    this.showLogin = false;
  }
  
  openSignup() {
    this.showLogin = true;
  }

  signUp(data: SignUp): void {
    this.seller.userSignUp(data);
  }

  login(data: Login): void {
    this.seller.userLogin(data);
  }
}
