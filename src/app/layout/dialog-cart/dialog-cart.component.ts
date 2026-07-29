import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
  ViewChild
} from '@angular/core';
import {Dialog} from "primeng/dialog";
import {CommonModule} from "@angular/common";
import {CartItem, ProductService} from "../../service/product.service";
import {Tab, TabList, TabPanel, Tabs} from "primeng/tabs";
import {Select} from "primeng/select";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {Button} from "primeng/button";
import {RadioButton} from "primeng/radiobutton";
import {AuthService} from "../../service/auth.service";
import {MessageService} from "primeng/api";
import {Toast} from "primeng/toast";
import {Router} from "@angular/router";
import {OrdersService} from "../../service/order.service";
import {NotificationMailService} from "../../service/notification-mail.service";
import {switchMap} from "rxjs";

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
    TableModule,
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

  paymentMethods = [
    {label: 'Cash On Delivery', value: 'cod'},
    {label: 'bKash', value: 'bkash'},
    {label: 'Card', value: 'card'}
  ];

  selectedPaymentMethods: string = 'cod';
  employeeInfo: any;
  isLoggedIn = false;
  loading: boolean = false;

  private readonly fromEmail: string = 'shozib@squarehealth.com.bd';
  private readonly toEmail: string = 'shozib@squarehealth.com.bd';

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
  visibleDialog1: boolean = false;

  constructor(public productService: ProductService,
              private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private orderService: OrdersService,
              private notificationMailService: NotificationMailService,
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

  private addDays(date: Date, days: number): Date {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  }

  private formatDDMMYYYY(date: Date): string {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  private getDeliveryDate(): string {
    const base = new Date();
    const date =
      this.selectedDeliveryDay === 'today'
        ? base
        : this.addDays(base, 1);

    return this.formatDDMMYYYY(date);
  }

  get totalPrice(): number {
    return this.cartItems().reduce((sum: number, item: CartItem) => {
      return sum + item.product.discountedPrice * item.quantity;
    }, 0);
  }

  tax = 0;
  discount = 0;

  get subtotal() {
    return this.totalPrice + this.tax - this.discount;
  }

  increase(item: any) {
    this.productService.addToCart(item.product);
  }

  decrease(item: any) {
    this.productService.decreaseFromCart(item.product);
  }

  remove(item: any) {
    this.productService.removeFromCart(item.product);
  }

  clearCart() {
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
    // this.onPlaceOrder();
    this.visibleDialog1 = true;
  }

  goToProductCart() {
    this.activeTab = '0';
  }

  onPlaceOrder() {
    if (!this.selectedPickupPoint) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Pickup point Required',
        detail: 'Please select a Pickup Point.',
      });
      return;
    }

    const now = new Date();
    const randomSegment = Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase();
    const dateSegment =
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0');

    const orderId = `ORD-${dateSegment}-${randomSegment}`;
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    console.log(this.selectedPickupPoint)
    const orderPayload = {
      orderId: orderId,
      employeeInfo: this.employeeInfo,
      deliveryOption: {
        pickupPoint: this.selectedPickupPoint,
        deliveryDay: this.getDeliveryDate(),
        paymentMethod: this.selectedPaymentMethods,
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
          brand: item.product.brand,
          image: item.product.image,
          totalPrice: item.quantity * item.product.discountedPrice
        })),
        totalPrice: this.totalPrice,
        tax: this.tax,
        discount: this.discount,
        subtotal: this.subtotal
      },
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    this.loading = true;

    this.orderService.createOrder(orderPayload).pipe(
      switchMap(() => {
        const html = this.buildCopyHtml();
        const text = this.buildCopyPlain();
        return this.notificationMailService.sendEmail({
          from: this.fromEmail,
          to: this.toEmail,
          subject: `Personal Product requisition`,
          text: text,
          html: html,
          process_now: true
        });
      })
    ).subscribe({
      next: () => {
        this.loading = false;
        this.visibleDialog = true;
        this.visible = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Order placed successfully.',
        });
        this.clearCart();
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Order Failed',
          detail: err?.error?.message || 'Failed to place order',
        });
      },
    });
  }


  // ---------- COPY: HTML + TEXT builders ----------

  private buildCopyHtml(): string {
    const i = this.employeeInfo;
    const rows = this.cartItems()
      .map(
        (row, idx) => `
      <tr>
        <td style="border:1px solid #6b7280;padding:8px;text-align:center;white-space:nowrap;">${idx + 1}</td>
        <td style="border:1px solid #6b7280;padding:8px;">${row.product.name}</td>
        <td style="border:1px solid #6b7280;padding:8px;text-align:center;white-space:nowrap;">${row.product.weightValue}${row.product.weightUnit}</td>
        <td style="border:1px solid #6b7280;padding:8px;text-align:center;white-space:nowrap;">${row.quantity}</td>
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
  <table style="border-collapse:collapse;width:auto;border:1px solid #6b7280;">
    <thead>
      <tr style="background:#f3f4f6;">
        <th style="border:1px solid #6b7280;padding:8px;text-align:center;white-space:nowrap;"><b>Sl</b></th>
        <th style="border:1px solid #6b7280;padding:8px;text-align:left;"><b>Product Name</b></th>
        <th style="border:1px solid #6b7280;padding:8px;text-align:center;white-space:nowrap;"><b>Product Amount</b></th>
        <th style="border:1px solid #6b7280;padding:8px;text-align:center;white-space:nowrap;"><b>Quantity</b></th>
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
    this.visibleDialog1 = false;
  }

}
