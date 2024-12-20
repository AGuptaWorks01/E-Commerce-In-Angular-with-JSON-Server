import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgbCarouselModule, CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[];
  trendyProduct: undefined | Product[];
  constructor(private product: ProductService) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((data) => {
      // console.log("popular product", data);
      this.popularProducts = data;
    })
    this.product.trendyProductS().subscribe((data) => {
      this.trendyProduct = data;
    })
  }
}
