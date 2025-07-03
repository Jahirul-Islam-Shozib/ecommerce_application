import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '../../service/product.service';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}


    ngOnInit(): void {
      this.productService.getAllProducts().subscribe({
        next: (data) => {
          this.products = data
          console.log(this.products)
        },
        error: (err) => console.error('Error fetching products:', err)
      });
    }



}
