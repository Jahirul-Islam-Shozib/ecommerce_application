import {Component, HostListener, OnInit} from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {NgForOf, NgIf} from "@angular/common";
import {NewProductsComponent} from "../new-products/new-products.component";
import {AllBrandsComponent} from "../all-brands/all-brands.component";
import {Skeleton} from "primeng/skeleton";
import {Paginator, PaginatorState} from "primeng/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AutocompleteSearchComponent} from "../autocomplete-search/autocomplete-search.component";
import {Drawer} from "primeng/drawer";
import {ProductCardComponent} from "../../shared/product-card/product-card.component";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NewProductsComponent,
    AllBrandsComponent,
    Skeleton,
    Paginator,
    Toast,
    AutocompleteSearchComponent,
    Drawer,
    ProductCardComponent,
  ],
  providers: [MessageService],
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any;
  loading: boolean = true;
  first: number = 0;
  pageNumber: number = 1;
  pageSize: number = 28;
  totalRecords: number = 0;
  selectedBrands: string[] = [];

  drawerVisible: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  constructor(protected productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.scrollToTop();
    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      const brandParam = params['brand'];

      if (productId) {
        this.selectedBrands = [];
        this.pageNumber = 1;
        this.first = 0;
        this.loadSingleProduct(productId);
      } else if (brandParam) {
        this.selectedBrands = Array.isArray(brandParam) ? brandParam : [brandParam];
        this.onBrandsChange(this.selectedBrands);
      } else {
        this.fetchProducts();
      }
    });
  }

  loadSingleProduct(id: string) {
    this.loading = true;
    this.productService.getProductListById(id).subscribe({
      next: (res) => {
        this.products = [res];
        console.log(this.products)
        this.totalRecords = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.products = [];
        this.totalRecords = 0;
        this.loading = false;
      }
    });
  }

  onBrandsChange(brands: string[]) {
    this.selectedBrands = brands;
    this.pageNumber = 1;
    this.first = 0;
    this.fetchProducts();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: this.selectedBrands.length ? this.selectedBrands : null,
        productId: null,
      },
      queryParamsHandling: 'merge'
    });
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.pageSize = event.rows ?? this.pageSize;
    this.pageNumber = (this.first / this.pageSize) + 1;
    this.loading = true;
    this.fetchProducts();
    this.scrollToTop();
  }

  fetchProducts(): void {
    const brands =
      this.selectedBrands && this.selectedBrands.length > 0
        ? this.selectedBrands
        : undefined;


    this.productService.getAllProducts(this.pageNumber, this.pageSize, brands).subscribe({
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

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }


  getQty(product: Product): number {
    const cart = this.productService.getCart(); // signal read
    const item = cart.find(ci => ci.product._id === product._id);
    return item?.quantity ?? 0;
  }

  onAddClick(product: Product) {
    this.productService.addToCart(product);

    this.messageService.add({
      severity: 'success',
      detail: `${product.name} added to cart`,
      life: 1200,
    });
  }

  // 🔹 +
  increment(product: Product) {
    this.productService.addToCart(product);
  }

  // 🔹 −
  decrement(product: Product) {
    this.productService.decreaseFromCart(product);
  }

  getDiscountedTotal(product: Product): number {
    const qty = this.getQty(product);
    return (qty > 0 ? qty : 1) * product.discountedPrice;
  }

}

