import { CommonModule } from '@angular/common';
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
  searchResult: undefined | Product[];

  constructor(private router: Router, private product: ProductService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (
          typeof localStorage !== 'undefined' &&
          localStorage.getItem('seller') &&
          val.url.includes('seller')
        ) {
          this.menuType = 'seller';
          if (localStorage.getItem('seller')) {
            let sellerStore = localStorage.getItem('seller')
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sallerName = sellerData.name
          }
        } else {
          // console.log('outside');
          this.menuType = 'default';
        }
      }
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigateByUrl('/');
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.product.searchProducts(element.value).subscribe((result) => {
        // console.log(this.product);
        if(result.length > 5){
          result.length = 5
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }
}
