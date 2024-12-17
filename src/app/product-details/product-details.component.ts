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

  constructor(private activeRoute: ActivatedRoute, private product: ProductService

  ) { }

  ngOnInit(): void {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId)
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.warn(result)
      this.productData = result;
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
}
