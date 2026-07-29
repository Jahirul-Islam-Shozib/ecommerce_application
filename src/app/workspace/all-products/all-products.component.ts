import {Component, HostListener, OnInit, Signal} from '@angular/core';
import {CartItem, Product, ProductService} from "../../service/product.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AllBrandsComponent} from "../all-brands/all-brands.component";
import {Skeleton} from "primeng/skeleton";
import {Paginator, PaginatorState} from "primeng/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {Toast} from "primeng/toast";
import {MessageService} from "primeng/api";
import {AutocompleteSearchComponent} from "../autocomplete-search/autocomplete-search.component";
import {Drawer} from "primeng/drawer";
import {ProductCardComponent} from "../../shared/product-card/product-card.component";
import {Divider} from "primeng/divider";
import {AllCategoryComponent, CategoryItem, ProductCategoryKey} from "../all-category/all-category.component";
import {AuthService} from "../../service/auth.service";
import {CartStateService} from "../../service/cart-state.service";
import {Chip} from "primeng/chip";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AllBrandsComponent,
    Skeleton,
    Paginator,
    Toast,
    AutocompleteSearchComponent,
    Drawer,
    ProductCardComponent,
    Divider,
    NgClass,
    AllCategoryComponent,
    Chip,
  ],
  providers: [MessageService],
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any;
  loading: boolean = true;
  hasError: boolean = false;
  first: number = 0;
  pageNumber: number = 1;
  pageSize: number = 28;
  totalRecords: number = 0;
  selectedBrands: string[] = [];
  selectedCategories: ProductCategoryKey[] = [];
  cartItems!: Signal<CartItem[]>;

  drawerVisible: boolean = false;
  isMobile: boolean = false;
  checkoutDrawerVisible: boolean = false;
  hasCheckoutDrawerOpened = false;

  tax = 50;
  discount = 50;

  employeeInfo: any;
  isLoggedIn = false;

  categories: CategoryItem[] = [
    {key: 'BEVERAGES', label: 'Beverages', icon: 'pi-cup'},
    {key: 'RICE_GRAINS', label: 'Rice', icon: 'pi-box'},
    {key: 'COOKING_ITEMS', label: 'Cooking items', icon: 'pi-sliders-h'},
    {key: 'SPICES_MASALA', label: 'Spices & Masala', icon: 'pi-sparkles'},
    {key: 'SAUCES_PICKLES', label: 'Sauces & Pickles', icon: 'pi-tags'},
    {key: 'SNACKS', label: 'Snacks', icon: 'pi-star'},
    {key: 'SKIN_CARE', label: 'Skin Care', icon: 'pi-heart'},
    {key: 'BABY_CARE', label: 'Baby Care', icon: 'pi-user'},
    {key: 'CLEANING', label: 'Cleaning', icon: 'pi-filter'},
    {key: 'PERSONAL_CARE', label: 'Personal Care', icon: 'pi-id-card'},
    {key: 'HEALTH_CARE', label: 'Health Care', icon: 'pi-shield'},
    {key: 'OTHERS', label: 'Others', icon: 'pi-ellipsis-h'},
  ];

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  constructor(protected productService: ProductService,
              private route: ActivatedRoute,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
              private cartState: CartStateService,
  ) {
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    this.cartItems = this.productService.getCart;
    this.scrollToTop();
    this.getUserInfo();

    this.route.queryParams.subscribe(params => {
      const productId = params['productId'];
      const brandParam = params['brand'];
      const categoryParam = params['category'];

      this.selectedBrands = brandParam
        ? (Array.isArray(brandParam) ? brandParam : [brandParam])
        : [];

      this.selectedCategories = categoryParam
        ? (Array.isArray(categoryParam) ? categoryParam : [categoryParam]) as ProductCategoryKey[]
        : [];

      this.pageNumber = 1;
      this.first = 0;

      if (productId) {
        this.loadSingleProduct(productId);
      } else {
        this.fetchProducts();
      }
    });
  }

  getUserInfo() {
    this.authService.currentUser$.subscribe(
      user => {
        this.employeeInfo = user;
        console.log(this.employeeInfo)
        this.isLoggedIn = !!user;
      }
    )
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

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: this.selectedBrands.length ? this.selectedBrands : null,
        productId: null,
      },
      queryParamsHandling: 'merge'
    });
  }

  onCategoriesChange(categories: ProductCategoryKey[]) {
    this.selectedCategories = categories;

    this.pageNumber = 1;
    this.first = 0;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length ? this.selectedCategories : null,
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
    const brands = this.selectedBrands.length ? this.selectedBrands : undefined;
    const categories = this.selectedCategories.length ? this.selectedCategories : undefined;

    this.productService.getAllProducts(this.pageNumber, this.pageSize, brands, categories).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalRecords = response.total;
        this.hasError = false;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.products = [];
        this.hasError = true;
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

    if (!this.hasCheckoutDrawerOpened) {
      this.checkoutDrawerVisible = true;
      this.hasCheckoutDrawerOpened = true;
    }

    this.messageService.add({
      severity: 'success',
      detail: `${product.name} added to cart`,
      life: 1200,
    });
  }

  // 🔹 +
  increaseQuantity(item: any) {
    this.productService.addToCart(item);
  }

  // 🔹 −
  decreaseQuantity(item: any) {
    this.productService.decreaseFromCart(item);
  }

  openCheckoutDrawer() {
    this.checkoutDrawerVisible = true;
  }

  get totalPrice(): number {
    return this.cartItems().reduce((sum: number, item: CartItem) => {
      return sum + item.product.discountedPrice * item.quantity;
    }, 0);
  }

  get subtotal() {
    return this.totalPrice + this.tax - this.discount;
  }

  goToCheckout() {
    const currentUrl = this.router.url;

    if (!this.isLoggedIn || !this.employeeInfo) {
      this.router.navigate(['/auth/login'], {
        queryParams: {redirectUrl: currentUrl},
      });
      return;
    }
    this.cartState.requestOpenCartDialog();
  }

  removeItem(item: any) {
    this.productService.removeFromCart(item);

    if (this.productService.getCartItemCount() === 0) {
      this.checkoutDrawerVisible = false;
      this.hasCheckoutDrawerOpened = false;
    }
  }


  clearCart() {
    this.productService.clearCart();
  }

  getCategoryLabel(key: ProductCategoryKey): string {
    const item = this.categories.find(c => c.key === key);
    return item ? item.label : key;
  }

  removeCategoryFilter(cat: ProductCategoryKey) {
    const updated = this.selectedCategories.filter(x => x !== cat);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: updated?.length ? updated : null,
        productId: null,
      },
      queryParamsHandling: 'merge'
    });
  }

  removeBrandFilter(brand: string) {
    const updated = this.selectedBrands.filter(b => b !== brand);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: updated?.length ? updated : null, // update URL
        productId: null,
      },
      queryParamsHandling: 'merge'
    });
  }

  clearAllFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        brand: null,
        category: null,
        productId: null,
      },
      queryParamsHandling: 'merge'
    });
  }

}

