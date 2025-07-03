// all-products.component.ts
import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any[] = [];

  constructor(protected productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
    });
  }
}

