import {Component, OnInit} from '@angular/core';
import {CommonModule, DatePipe} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {MessageService, PrimeTemplate} from "primeng/api";
import {OrdersService} from "../../../service/order.service";
import {OrderPayload} from "../../../models/order";
import {ProductService} from "../../../service/product.service";
import {Dialog} from "primeng/dialog";
import {Divider} from "primeng/divider";
import {AuthService} from "../../../service/auth.service";
import {Paginator, PaginatorState} from "primeng/paginator";

export type OrderStatus = 'All' | 'Pending' | 'Confirmed' | 'Delivered' | 'Cancel';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    CommonModule, DatePipe,
    ButtonDirective, Ripple, Button,
    Dialog, PrimeTemplate, Divider, Paginator
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  selectedOrder: any;
  value: OrderStatus = 'All';
  orders: OrderPayload[] = [];
  loading = false;
  visibleOrderDialog = false;
  employeeId?: string;

  page = 1;
  size = 10;
  totalRecords = 0;
  first = 0;

  constructor(
    private messageService: MessageService,
    private ordersService: OrdersService,
    private productService: ProductService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.employeeId = String(user.employeeId);
        this.loadOrders();
      }
    });
  }

  loadOrders(): void {
    this.loading = true;
    this.ordersService.getOrderList(this.page, this.size, {status: this.value, employeeId: this.employeeId}).subscribe({
      next: (res) => {
        this.orders = res.data ?? [];
        this.totalRecords = res.total ?? 0;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Orders',
          detail: err?.error?.message ?? 'Failed to load orders'
        });
      }
    });
  }

  onPageChange(event: PaginatorState): void {
    this.first = event.first ?? 0;
    this.size = event.rows ?? this.size;
    this.page = (this.first / this.size) + 1;
    this.loadOrders();
  }

  selectOrder(order: OrderPayload) {
    this.visibleOrderDialog = true;
    this.selectedOrder = order;
  }

  onAddToCart(order: OrderPayload) {
    const items = order.orderSummary?.items ?? [];
    if (!items.length) {
      this.messageService.add({severity: 'warn', summary: 'Re-order', detail: 'This order has no items'});
      return;
    }
    this.productService.setCartFromOrderItems(items);
    this.visibleOrderDialog = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Re-order Ready',
      detail: `Items from order ${order.orderId} added to cart`
    });
  }

  onReorder(order: OrderPayload, event: MouseEvent) {
    event.stopPropagation();
    this.messageService.add({
      severity: 'success',
      summary: 'Re-Order',
      detail: `Re-order started for #${order.orderId}`
    });
  }
}
