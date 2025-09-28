import {
  ChangeDetectorRef,
  Component,
  effect, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  ViewChild
} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {CommonModule} from "@angular/common";
import {CartStateService} from "../../service/cart-state.service";
import {CartItem, ProductService} from "../../service/product.service";
import {Tab, TabList, TabPanel, Tabs} from "primeng/tabs";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {Tag} from "primeng/tag";
import {TableModule} from "primeng/table";
import {Divider} from "primeng/divider";
import {Button} from "primeng/button";
import {RadioButton} from "primeng/radiobutton";
import {AuthService} from "../../service/auth.service";
import {MessageService} from "primeng/api";
import {Toast} from "primeng/toast";
import {Router} from "@angular/router";

interface EmployeeInfo {
  companyName: string;
  employeeId: string | number;
  location: string;
  name: string;
  department: string;
  designation?: string | null;
  contactNumber?: string | null;
}

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
    FormsModule,
    Tag,
    TableModule,
    Divider,
    Button,
    RadioButton,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './dialog-cart.component.html',
  styleUrl: './dialog-cart.component.scss'
})
export class DialogCartComponent implements OnInit {
  @Input() visible!: boolean;
  @ViewChild('summaryText') summaryText!: ElementRef;
  @Output() closeCart = new EventEmitter<boolean>();
  selectedDeliveryDay: string = 'today';
  selectedPickupPoint!: string;
  deliveryNote: string = '';

  deliveryOptions = [
    {label: 'Today', value: 'today', disabled: false},
    {label: 'Next Working Day', value: 'nextWorkingDay', disabled: false},
  ];

  employeeInfo: any;
  isLoggedIn = false;

  cartItems!: Signal<CartItem[]>;
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

  constructor(public productService: ProductService,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router
  ) {
  }

  ngOnInit() {
    this.cartItems = this.productService.getCart;
    this.checkDeliveryAvailability();
    this.getUserInfo();
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

  checkDeliveryAvailability() {
    const now = new Date();
    const currentHour = now.getHours();

    // If it's 10 AM or later
    if (currentHour >= 10) {
      this.deliveryOptions = [
        {label: 'Today', value: 'today', disabled: true},
        {label: 'Next Working Day', value: 'nextWorkingDay', disabled: false},
      ];
      this.selectedDeliveryDay = 'nextWorkingDay';
    } else {
      this.deliveryOptions = [
        {label: 'Today', value: 'today', disabled: false},
        {label: 'Next Working Day', value: 'nextWorkingDay', disabled: false},
      ];
      this.selectedDeliveryDay = 'today';
    }
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
    this.activeTab = '0';
  }

  goToCheckout() {
    const currentUrl = this.router.url;

    if (!this.isLoggedIn || !this.employeeInfo) {
      this.onCloseCart();
      this.router.navigate(['/auth/login'], {
        queryParams: {redirectUrl: currentUrl},
      });
      return;
    }
    // this.activeTab = '1';
    this.onPlaceOrder();
  }

  goToProductCart() {
    this.activeTab = '0';
  }

  onPlaceOrder() {
    const randomSegment = Math.random().toString(36).substring(2, 7).toUpperCase(); // e.g. "K3A9F"
    const dateSegment = new Date().toISOString().slice(0, 10).replace(/-/g, '');    // e.g. "20251113"
    const orderId = `ORD-${dateSegment}-${randomSegment}`;

    this.visibleDialog = true;
    const orderPayload = {
      orderId: orderId,
      employeeInfo: this.employeeInfo,
      deliveryOption: {
        pickupPoint: this.selectedPickupPoint,
        deliveryDay: this.selectedDeliveryDay,
        paymentMethod: 'Cash On Delivery',
        deliveryNote: this.deliveryNote || ''
      },
      orderSummary: {
        items: this.cartItems().map(item => ({
          productId: item.product._id,
          productName: item.product.name,
          weightValue: item.product.weightValue,
          weightUnit: item.product.weightUnit,
          quantity: item.quantity,
          pricePerUnit: item.product.discountedPrice,
          totalPrice: item.quantity * item.product.discountedPrice
        })),
        totalPrice: this.totalPrice,
        tax: this.tax,
        discount: this.discount,
        subtotal: this.subtotal
      },
      createdAt: new Date().toISOString()
    };
    console.log(orderPayload)
    console.log(this.cartItems())
  }

  // async copyOrderSummary() {
  //   const htmlContent = this.summaryText.nativeElement.outerHTML;
  //   const plainText = this.summaryText.nativeElement.innerText.trim();
  //
  //   try {
  //     if (navigator.clipboard && 'write' in navigator.clipboard && 'ClipboardItem' in window) {
  //       const item = new ClipboardItem({
  //         'text/html': new Blob([htmlContent], {type: 'text/html'}),
  //         'text/plain': new Blob([plainText], {type: 'text/plain'}),
  //       } as any);
  //       await (navigator.clipboard as any).write([item]);
  //     } else {
  //       await navigator.clipboard.writeText(plainText);
  //     }
  //     alert('Copied to clipboard!');
  //   } catch (err) {
  //     console.error('Copy failed', err);
  //   }
  // }


  // ---------- COPY: HTML + TEXT builders ----------

  private buildCopyHtml(): string {
    const i = this.employeeInfo;
    const rows = this.cartItems()
      .map(
        (row, idx) => `
      <tr>
        <td style="border:1px solid #6b7280;padding:8px;text-align:center;width:56px;">${idx + 1}</td>
        <td style="border:1px solid #6b7280;padding:8px;">
          ${row.product.name}
        </td>
        <td style="border:1px solid #6b7280;padding:8px;text-align:center;width:120px;">
          ${row.product.weightValue}${row.product.weightUnit}
        </td>
        <td style="border:1px solid #6b7280;padding:8px;text-align:center;width:88px;">
          ${row.quantity}
        </td>
      </tr>`
      )
      .join('');

    return `
<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#111;line-height:1.35;">
  <!-- Employee info -->
  <div style="margin-bottom:16px;">
    <div><b>Company Name:</b> ${i.company}</div>
    <div><b>Employee ID:</b> ${i.employeeId}&nbsp;&nbsp;&nbsp;&nbsp;<b>Location:</b> ${'Pacific tower'}</div>
    <div><b>Name:</b> ${i.name}</div>
    <div><b>Department:</b> ${i.department}</div>
    <div><b>Designation:</b> ${i.designation ?? ''}</div>
    <div><b>Contact Number:</b> ${i.phone ?? ''}</div>
  </div>

  <!-- Product table -->
  <table style="border-collapse:collapse;width:50%;border:1px solid #6b7280;table-layout:fixed;">
    <thead>
      <tr style="background:#f3f4f6;">
        <th style="border:1px solid #6b7280;padding:8px;text-align:center;width:56px;"><b>Sl</b></th>
        <th style="border:1px solid #6b7280;padding:8px;text-align:left;"><b>Product Name</b></th>
        <th style="border:1px solid #6b7280;padding:8px;text-align:center;width:120px;"><b>Product Amount</b></th>
        <th style="border:1px solid #6b7280;padding:8px;text-align:center;width:88px;"><b>Quantity</b></th>
      </tr>
    </thead>
      <tbody>
      ${rows}
      </tbody>
    </table>
  </div>`;
  }

  private buildCopyPlain(): string {
    const i = this.employeeInfo;
    const header = `Company Name: ${i.company}
                    Employee ID: ${i.employeeId}    Location: ${'Pacific tower'}
                    Name: ${i.name}
                    Department: ${i.department}
                    Designation: ${i.designation ?? ''}
                    Contact Number: ${i.phone ?? ''}

                     Sl\tProduct Name\tProduct Amount\tQuantity`;

    const lines = this.cartItems()
      .map(
        (row, idx) =>
          `${idx + 1}\t${row.product.name}\t${row.product.weightValue}${row.product.weightUnit}\t${row.quantity}`
      )
      .join('\n');

    return `${header}\n${lines}`;
  }

  // ---------- COPY: main action (with robust fallback) ----------

  async copyOrderSummary(): Promise<void> {
    const html = this.buildCopyHtml();
    const text = this.buildCopyPlain();

    // Modern Clipboard API (secure context required)
    try {
      if (navigator.clipboard?.write && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], {type: 'text/html'}),
          'text/plain': new Blob([text], {type: 'text/plain'}),
        });
        await navigator.clipboard.write([item]);
        this.messageService.add({
          severity: 'success',
          detail: `Successfully copied order list`,
          life: 1200,
        });

        // this.productService.clearCart();
        this.visibleDialog = false;
        return;
      }
    } catch (e) {
      // continue to fallback
      console.warn('Modern clipboard failed, falling back.', e);
    }

    // Fallback: select a hidden, contentEditable element with our HTML
    const temp = document.createElement('div');
    temp.contentEditable = 'true';
    temp.style.position = 'fixed';
    temp.style.left = '-99999px';
    temp.innerHTML = html;
    document.body.appendChild(temp);

    const range = document.createRange();
    range.selectNodeContents(temp);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);

    document.execCommand('copy');
    document.body.removeChild(temp);
    // alert('Order summary copied (fallback).');
  }

  onCancel() {
    this.visibleDialog = false;
  }

}
