import {Component, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {MessageService, PrimeTemplate} from "primeng/api";
import {OrdersService} from "../../../service/order.service";
import {OrderPayload} from "../../../models/order";
import {ProductService} from "../../../service/product.service";
import {Dialog} from "primeng/dialog";
import {Divider} from "primeng/divider";

export type OrderStatus =
  | 'All'
  | 'Pending'
  | 'Confirmed'
  | 'Delivered'
  | 'Cancel';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    DatePipe,
    NgIf,
    ButtonDirective,
    Ripple,
    Button,
    Dialog,
    PrimeTemplate,
    Divider
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  selectedOrder: any
  value: OrderStatus = 'All';

  orders!: OrderPayload[]
  loading = false;
  visibleOrderDialog = false;

  // optional: pagination
  page = 1;
  size = 10;


  constructor(private messageService: MessageService,
              private ordersService: OrdersService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;

    // If you want employee-specific orders:
    // const employeeId = '56';

    this.ordersService
      .getOrderList(this.page, this.size, {status: this.value})
      .subscribe({
        next: (res) => {
          // this.setOrdersFromApi(res.data ?? []);
          this.orders = res.data ?? []
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Orders',
            detail: err?.error?.message ?? 'Failed to load orders',
          });
        },
      });
  }

  selectOrder(order: OrderPayload) {
    this.visibleOrderDialog = true;
    this.selectedOrder = order;
  }

  onAddToCart(order: OrderPayload){
    const items = order.orderSummary?.items ?? [];
    if (!items.length) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Re-order',
        detail: 'This order has no items',
      });
      return;
    }

    this.productService.setCartFromOrderItems(items);
    this.visibleOrderDialog = false;

    this.messageService.add({
      severity: 'success',
      summary: 'Re-order Ready',
      detail: `Items from order ${order.orderId} added to cart`,
    });
  }

  onReorder(order: OrderPayload, event: MouseEvent) {
    event.stopPropagation();

    // later: call reorder API
    this.messageService.add({
      severity: 'success',
      summary: 'Re-Order',
      detail: `Re-order started for #${order.orderId}`,
    });
  }

  // ✅ API mapping ready
  // setOrdersFromApi(apiData: any[]) {
  //   this.orders = (apiData ?? []).map((o) => ({
  //     orderId: Number(o.id ?? o.orderId),
  //     itemsCount: Number(o.itemsCount ?? o.items ?? 0),
  //     date: String(o.date ?? o.createdAt ?? new Date().toISOString()),
  //     status: (o.status ?? 'Pending') as OrderStatus,
  //     canReorder: (o.canReorder ?? ['Complete', 'Cancel'].includes(o.status)) === true,
  //   }));
  // }
}
