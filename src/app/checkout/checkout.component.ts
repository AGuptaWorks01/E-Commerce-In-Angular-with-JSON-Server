import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { cart, order } from '../data-type';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  ordermsg: string | undefined;

  constructor(private product: ProductService, private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.product.currentCart().subscribe((result) => {
        let price = 0;
        this.cartData = result;
        result.forEach((item) => {
          if (item.quantity) {
            price = price + +item.price * +item.quantity;
          }
        });
        this.totalPrice = price + price / 10 + 100 - price / 10;

        console.warn(this.totalPrice);
      });
    }
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id);
        }, 500);
      });

      this.product.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.ordermsg = 'Your order has been placed!';
          // alert('Order Placed');

          setTimeout(() => {
            this.router.navigateByUrl('my-orders');
            this.ordermsg = '';
          }, 2000);
        }
      });
    }
  }
}
