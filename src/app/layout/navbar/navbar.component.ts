import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ProductService} from "../../service/product.service";
import {BadgeModule} from 'primeng/badge';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {DialogModule} from 'primeng/dialog';
import {DialogCartComponent} from "../dialog-cart/dialog-cart.component";
import {CartStateService} from "../../service/cart-state.service";
import {AutocompleteSearchComponent} from "../../workspace/autocomplete-search/autocomplete-search.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    BadgeModule,
    OverlayBadgeModule,
    FormsModule,
    DropdownModule,
    CommonModule,
    DialogModule,
    DialogCartComponent,
    AutocompleteSearchComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  cartDialogVisible: boolean = false;
  isBrowser: boolean = false;
  filteredProducts: any[] = [];
  products: any[] = [];

  constructor(public productService: ProductService,
              public cartState: CartStateService,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit(): void {
    // this.productService.getAllProducts().subscribe(data => {
    //   this.products = data;
    // });
    // console.log(this.products)
  }

  openCart() {
    if (this.isBrowser) {
      this.cartDialogVisible = true;
    }
  }

  filterProduct(event: any) {
    console.log(event);
    const query = (event.query || '').toLowerCase();

    this.filteredProducts = this.products.filter((product: any) =>
      product?.productName?.toLowerCase().includes(query)
    );

    console.log(this.filteredProducts);
  }

  onProductSelect(product: any) {
    console.log(product.value.productName);
  }

}
