import {Component, inject, OnInit} from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss'
})
export class PopularProductsComponent implements OnInit {

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    // this.productService.getAllPopularProducts().subscribe(data => {
    //   this.popularProducts = data;
    // });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
