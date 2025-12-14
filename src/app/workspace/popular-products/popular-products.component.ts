import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProductCardComponent} from "../../shared/product-card/product-card.component";

@Component({
  selector: 'app-popular-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    ProductCardComponent
  ],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.scss'
})
export class PopularProductsComponent implements OnInit {
  popularProducts: any;

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts(1, 8).subscribe({
      next: (response) => {
        this.popularProducts = response.data
        console.log(this.popularProducts)
        // this.totalRecords = response.total;
        // this.loading = false;
      },
      error: (err) => {
        console.error(err);
        // this.loading = false;
      }
    });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }

  increment(product: Product) {
    this.productService.addToCart(product);
  }

  decrement(product: Product) {
    this.productService.decreaseFromCart(product);
  }

  getQty(product: Product): number {
    const cart = this.productService.getCart(); // signal read
    const item = cart.find(ci => ci.product._id === product._id);
    return item?.quantity ?? 0;
  }
}

