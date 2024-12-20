import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;
  isActionCompleted = false;

  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.list();
  }

  deleteproduct(id: number) {
    // console.warn("selected id for delete", id);

    if (confirm("Are you sure you want to delete?") == true) {
      this.product.deleteProduct(id).subscribe((result) => {
        if (result) {
          this.productMessage = "Product is deleted!";
          this.list();

          setTimeout(() => {
            this.productMessage = undefined;
          }, 5000);
        }
      })
      this.isActionCompleted = true;
    } else {
      this.productMessage = "Product deletion canceled!";
      this.isActionCompleted = true;
    }
    setTimeout(() => {
      this.productMessage = undefined;
    }, 5000);
  }

  list() {
    this.product.productList().subscribe((result) => {
      // console.warn(result);
      if (result) {
        this.productList = result;
      }
    });
  }
}
