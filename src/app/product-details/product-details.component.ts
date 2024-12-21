import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, Product } from '../data-type';
import { CommonModule, JsonPipe } from '@angular/common';
import { warn } from 'console';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  prodcutQuantity: number = 1;
  removeCart = false;
  cartData: Product | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      let productId = this.activeRoute.snapshot.paramMap.get('productId');
      // console.warn(productId)
      productId &&
        this.product.getProduct(productId).subscribe((result) => {
          // console.warn(result)
          this.productData = result;

          // add cart item remove krne ka function
          let cartData = localStorage.getItem('localCart');
          if (productId && cartData) {
            let items = JSON.parse(cartData);
            items = items.filter(
              (item: Product) => productId == item.id.toString()
            );
            if (items.length) {
              this.removeCart = true;
            } else {
              this.removeCart = false;
            }
          }
          let user = localStorage.getItem('user');
          if (user) {
            let userId = user && JSON.parse(user).id;
            this.product.getCartList(userId);
            this.product.cartData.subscribe((result) => {
              let item = result.filter(
                (item: Product) =>
                  productId?.toString() === item.productId?.toString()
              );
              if (item.length) {
                this.cartData = item[0];
                this.removeCart = true;
              }
            });
          }
        });
    }
  }

  handleQuantity(val: string) {
    if (this.prodcutQuantity < 20 && val === 'max') {
      this.prodcutQuantity += 1;
      // this.prodcutQuantity = this.prodcutQuantity + 1
    } else if (this.prodcutQuantity > 1 && val === 'min') {
      this.prodcutQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.prodcutQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData);
        this.removeCart = true;
      } else {
        // console.log('user isLoggedIn');
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id,
        };
        delete cartData.id;
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            this.product.getCartList(userId);
            this.removeCart = true;
            alert('Product is added in cart');
          }
        });
      }
    }
  }

  RemoveToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.product.removeItemFormCart(productId);
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData &&
      this.product.removeToCart(this.cartData.id).subscribe((result) => {
        if (result) {
          this.product.getCartList(userId);
        }
      });
      this.removeCart = false;
    }
  }
}
