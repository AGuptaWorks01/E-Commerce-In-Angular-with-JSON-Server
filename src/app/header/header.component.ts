import { CommonModule, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sallerName: string = '';
  userName: string = '';
  searchResult: undefined | Product[];
  cartItems = 0;

  constructor(private router: Router, private product: ProductService) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.router.events.subscribe((val: any) => {
        if (val.url) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sallerName = sellerData.name;
            this.menuType = 'seller';
          }
          else if (localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
            this.product.getCartList(userData.id)
          } else {
            this.menuType = 'default';
          }
        }
      });

      let cartData = localStorage.getItem('localCart');
      if (cartData) {
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product.cartData.subscribe((items) => {
        this.cartItems = items.length;
      });
    }
  }

  sellerlogout() {
    localStorage.removeItem('seller');
    this.router.navigateByUrl('/');
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/user-auth');
    this.product.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.log(this.product);
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.router.navigateByUrl('/details/' + id);
  }

  submitSearch(val: string) {
    console.log(val);
    this.router.navigateByUrl(`search/${val}`);
  }
}
