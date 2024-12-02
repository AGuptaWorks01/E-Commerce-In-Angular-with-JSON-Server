import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private htpp: HttpClient) {}

  addProduct(data: Product) {
    return this.htpp.post(' http://localhost:3000/products', data);
  }

  productList(){
    return this.htpp.get<Product[]>('http://localhost:3000/products')
  }
}
