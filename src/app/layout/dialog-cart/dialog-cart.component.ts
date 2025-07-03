import {ChangeDetectorRef, Component, effect, EventEmitter, Input, OnInit, Output, Signal} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {CommonModule} from "@angular/common";
import {CartStateService} from "../../service/cart-state.service";
import {CartItem, ProductService} from "../../service/product.service";
import {Tab, TabList, TabPanel, Tabs} from "primeng/tabs";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-dialog-cart',
  standalone: true,
  imports: [
    Dialog,
    CommonModule,
    Tabs,
    TabList,
    Tab,
    TabPanel,
    Select,
    FormsModule
  ],
  templateUrl: './dialog-cart.component.html',
  styleUrl: './dialog-cart.component.scss'
})
export class DialogCartComponent implements OnInit {
  @Input() visible!: boolean;

  @Output() closeCart = new EventEmitter<boolean>();

  cartItems!: Signal<CartItem[]>;
  selectedPickupPoint!: string;
  activeTab: string = '0';
  pickupPoints = [
    "CHQ (Square Centre, Mohakhali)",
    "Square Food & Beverage Limited (SFBL Tower, Banani)",
    "Square Toiletries Limited (Samson Center, Gulshan-1)",
    "Maasranga Television Center (Maasranga Television, Banani)",
    "Aegis (Aegis, Banani)",
    "Square Hospitals Ltd (Square Hospitals, Panthapath)",
    "SQUARE Fashions Ltd (Anita Center, Uttara)",
    "Dhaka Sales Office (Tejgaon)",
    "Square Pharma (Dhaka Unit, Kaliakair)",
    "Savar Sales Office (Savar)",
    "Square Textiles (Sardagonj)",
    "Square Fashions (Valuka)",
    "Tongi Sales Office (Tongi)",
    "Square Denims Ltd. (Habiganj)",
    "Moulvi Bazar Sales Office (Moulavibazar)",
    "Square Pharma - Pabna (Salgaria, Pabna)",
    "Square Lifesciences - Pabna (BSCIC, Pabna)",
    "Pabna Sales Office (Pabna)",
    "Square Food & Beverage - Pabna Plant (Meril Road, Pabna)",
    "Square Toiletries - Pabna Plant (Meril Road, Pabna)"
  ];
  visibleDialog: boolean = false;

  constructor(public productService: ProductService) {
  }

  ngOnInit() {
    this.cartItems = this.productService.getCart;
  }

  get totalPrice(): number {
    return this.cartItems().reduce((sum: number, item: CartItem) => {
      return sum + item.product.discountedPrice * item.quantity;
    }, 0);
  }

  tax = 50;
  discount = 50;

  get subtotal() {
    return this.totalPrice + this.tax - this.discount;
  }

  increase(item: any) {
    // item.quantity++;
    this.productService.addToCart(item.product);
  }

  decrease(item: any) {
    // if (item.quantity > 1) item.quantity--;
    this.productService.decreaseFromCart(item.product);
  }

  remove(item: any) {
    // this.cartItems = this.cartItems.filter(i => i !== item);
    this.productService.removeFromCart(item.product);
  }

  clearCart() {
    // this.cartItems = [];
    this.productService.clearCart();
  }

  onCloseCart() {
    this.closeCart.emit(false)
  }

  goToCheckout() {
    this.activeTab = '1';
  }

  goToProductCart() {
    this.activeTab = '0';
  }

  onPlaceOrder(){
    this.visibleDialog = true;
  }
}
