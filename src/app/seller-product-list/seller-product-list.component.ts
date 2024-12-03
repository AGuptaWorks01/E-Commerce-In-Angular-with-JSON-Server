import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './seller-product-list.component.html',
  styleUrl: './seller-product-list.component.css',
})
export class SellerProductListComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private product: ProductService, private router: Router) { }

  ngOnInit(): void { }

  submit(data: Product) {
    this.product.addProduct(data).subscribe((result) => {
      // console.log(result);
      if (result) {
        this.addProductMessage = 'Product is Succedfully addedd';
      }
      setTimeout(() => {
        this.addProductMessage = undefined;
        this.router.navigateByUrl('seller-home')
      }, 1000);
    });
  }
}
