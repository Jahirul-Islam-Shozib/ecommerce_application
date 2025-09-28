import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {TopBrandsComponent} from "../top-brands/top-brands.component";
import {NewProductsComponent} from "../new-products/new-products.component";
import {AllBrandsComponent} from "../all-brands/all-brands.component";
import {BestDealsProductsComponent} from "../best-deals-products/best-deals-products.component";
import {AllProduct} from "../../models/product";
import {ProgressSpinner} from "primeng/progressspinner";
import {Skeleton} from "primeng/skeleton";
import {Paginator, PaginatorState} from "primeng/paginator";

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
    BestDealsProductsComponent,
    ProgressSpinner,
    Skeleton,
    Paginator
  ],
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any;
  loading: boolean = true;
  first: number = 0;
  pageNumber: number = 1;
  pageSize: number = 28;
  totalRecords: number = 0;

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? this.pageSize;
    this.pageNumber = (this.first / this.pageSize) + 1;
    this.loading = true;
    this.fetchProducts();
    this.scrollToTop();
  }

  constructor(protected productService: ProductService,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    this.scrollToTop();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.productService.getAllProducts(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalRecords = response.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  scrollToTop(){
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
}

