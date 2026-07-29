import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Product} from "../../service/product.service";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnChanges {
  @Input() product!: Product;
  @Input() qty: number = 0;

  @Output() add = new EventEmitter<Product>();
  @Output() increment = new EventEmitter<Product>();
  @Output() decrement = new EventEmitter<Product>();

  imageError = false;

  ngOnChanges() {
    this.imageError = false;
  }

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
