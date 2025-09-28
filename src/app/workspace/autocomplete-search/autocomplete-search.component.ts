import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AutoComplete} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {Product, ProductService} from "../../service/product.service";

export interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-autocomplete-search',
  standalone: true,
  imports: [
    AutoComplete,
    FormsModule,
    PrimeTemplate,
    NgIf
  ],
  templateUrl: './autocomplete-search.component.html',
  styleUrl: './autocomplete-search.component.scss'
})
export class AutocompleteSearchComponent implements OnInit {
  selectedProduct!: any;
  searchedProducts: any;
  filteredProducts: any[] = [];

  constructor(private router: Router,
              private productService: ProductService,) {
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.searchedProducts = data.data;
    });
  }

  filterProduct(event: any) {
    const query: string = (event.query || '').toLowerCase().trim();

    // split query into words
    const words: string[] = query.split(/\s+/);

    this.filteredProducts = this.searchedProducts.filter((product: any) => {
      const name: string = product?.name?.toLowerCase() || '';

      // return true only if *every* word is contained in the product name
      return words.every((word: string) => name.includes(word));
    });
  }

  onProductSelect(event: any) {
    const selected: Product = event?.value ?? event;

    console.log('Selected product:', selected);

    if (!selected?._id) {
      console.warn('Selected product has no _id');
      return;
    }

    // 🔥 Redirect to /products and let products page show the list
    this.router.navigate(['/products'], {
      queryParams: {productId: selected._id}
    });
  }

  clearSelectedProduct() {
    this.selectedProduct = null;
    this.filteredProducts = [];
    this.router.navigate(['/products']);
  }
}
