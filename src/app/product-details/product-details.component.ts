import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  prodcutQuantity: number = 1;
  removeCart = false;

  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((result) => {
      // console.warn(result)
      this.productData = result;

      // add cart item remove krne ka function
      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: Product) => productId == item.id.toString())
        if (items.length) {
          this.removeCart = true
        } else {
          this.removeCart = false
        }
      }
    })
  }

  handleQuantity(val: string) {
    if (this.prodcutQuantity < 20 && val === 'max') {
      this.prodcutQuantity += 1;
      // this.prodcutQuantity = this.prodcutQuantity + 1
    } else if (this.prodcutQuantity > 1 && val === 'min') {
      this.prodcutQuantity -= 1;
    }
  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.prodcutQuantity;
      if (!localStorage.getItem('user')) {
        this.product.localAddToCart(this.productData)
        this.removeCart = true
      }
    }
  }

  RemoveToCart(productId: number) {
    this.product.removeItemFormCart(productId)
    this.removeCart = false
  }
}
