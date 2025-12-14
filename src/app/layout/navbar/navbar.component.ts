import {Component, HostListener, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {Product, ProductService} from "../../service/product.service";
import {BadgeModule} from 'primeng/badge';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {CommonModule} from "@angular/common";
import {DialogModule} from 'primeng/dialog';
import {DialogCartComponent} from "../dialog-cart/dialog-cart.component";
import {CartStateService} from "../../service/cart-state.service";
import {AutocompleteSearchComponent} from "../../workspace/autocomplete-search/autocomplete-search.component";
import {MessageService} from "primeng/api";
import {Select} from "primeng/select";
import {AuthService, AuthUser} from "../../service/auth.service";

interface SignUpUser {
  name: string;
  company: string;
  employeeId: string;
  phone: string;
  email: string;
  password: string;
}

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
    AutocompleteSearchComponent,
    Select
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  cartDialogVisible: boolean = false;
  products: any[] = [];
  currentUser: AuthUser | null = null;
  isMobile: boolean = false;
  userMenuOptions = [
    {label: 'Profile', value: 'profile'},
    {label: 'Orders', value: 'orders'},
    {label: 'Logout', value: 'logout'}
  ];

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  constructor(public productService: ProductService,
              public cartState: CartStateService,
              private router: Router,
              private messageService: MessageService,
              private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadCurrentUser();
    this.isMobile = window.innerWidth < 768;
  }

  loadCurrentUser(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  onUserOptionChange(action: string | null) {
    if (!action) return;

    switch (action) {
      case 'profile':
        this.router.navigate(['/profile']); // adjust route if needed
        break;

      case 'orders':
        this.router.navigate(['/orders']); // adjust route if needed
        break;

      case 'logout':
        this.authService.logout();
        this.router.navigate(['/auth/login']);
        break;
    }
  }

  openCart() {
    if (this.productService.getCartItemCount() === 0) {
      this.messageService.add({
        severity: 'info',
        summary: 'Cart Empty',
        detail: 'Cart has no product. Please select a product.',
        life: 1500
      });
      return;
    }
    this.cartDialogVisible = true;
  }

}
