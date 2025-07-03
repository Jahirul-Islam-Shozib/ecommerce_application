import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {Select} from "primeng/select";
import {ProductService} from "../../service/product.service";
import {BadgeModule} from 'primeng/badge';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {DialogModule} from 'primeng/dialog';
import {DialogCartComponent} from "../dialog-cart/dialog-cart.component";
import {CartStateService} from "../../service/cart-state.service";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    BadgeModule,
    OverlayBadgeModule,
    FormsModule,
    DropdownModule,
    Select,
    CommonModule,
    DialogModule,
    DialogCartComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  selectedSearch: any;
  cartDialogVisible: boolean = false;
  isBrowser: boolean = false;

  searchOptions = [
    {label: 'Pizza', value: 'pizza'},
    {label: 'Burger', value: 'burger'},
    {label: 'Pasta', value: 'pasta'},
    {label: 'Pepsi', value: 'pepsi'},
    {label: 'Coke', value: 'coke'}
  ];

  constructor(public productService: ProductService,
              public cartState: CartStateService,
              @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

  ngOnInit(): void {
  }

  openCart() {
    if (this.isBrowser) {
      this.cartDialogVisible = true;
    }
  }

}
