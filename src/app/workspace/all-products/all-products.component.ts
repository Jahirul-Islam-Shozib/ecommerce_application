// all-products.component.ts
import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {NgForOf, NgIf} from "@angular/common";
import {TopBrandsComponent} from "../top-brands/top-brands.component";
import {NewProductsComponent} from "../new-products/new-products.component";
import {AllBrandsComponent} from "../all-brands/all-brands.component";
import {BestDealsProductsComponent} from "../best-deals-products/best-deals-products.component";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TopBrandsComponent,
    NewProductsComponent,
    AllBrandsComponent,
    BestDealsProductsComponent
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

