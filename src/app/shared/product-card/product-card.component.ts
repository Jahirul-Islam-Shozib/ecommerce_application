import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../service/product.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() qty: number = 0; // current qty in cart

  @Output() add = new EventEmitter<Product>();
  @Output() increment = new EventEmitter<Product>();
  @Output() decrement = new EventEmitter<Product>();

  onAdd() {
    this.add.emit(this.product);
  }

  onIncrement() {
    this.increment.emit(this.product);
  }

  onDecrement() {
    this.decrement.emit(this.product);
  }

  get hasDiscount(): boolean {
    return this.product.originalPrice !== this.product.discountedPrice;
  }

  get displayPrice(): number {
    const qty = this.qty > 0 ? this.qty : 1;
    return qty * this.product.discountedPrice;
  }
}
