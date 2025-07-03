import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Product, ProductService} from "../../service/product.service";

@Component({
  selector: 'app-best-deals-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './best-deals-products.component.html',
  styleUrl: './best-deals-products.component.scss'
})
export class BestDealsProductsComponent {

  constructor(public productService: ProductService) {}

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
