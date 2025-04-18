import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  };
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadDetails()
  }

  checkout() {
    this.router.navigateByUrl('checkout');
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if (item.quantity !== undefined && item.price !== undefined) {
          price += (item.price ?? 0) * (item.quantity ?? 1);
        }
      });

      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price + price / 10 + 100 - price / 10;

      if (!this.cartData.length) {
        this.router.navigateByUrl('/')
      }
    });
  }

  removeToCart(cartId: number | undefined) {
    cartId &&
      this.cartData &&
      this.product.removeToCart(cartId).subscribe((result) => {
        this.loadDetails()
      });
  }
}
