import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AutoComplete} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {PrimeTemplate} from "primeng/api";

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
    PrimeTemplate
  ],
  templateUrl: './autocomplete-search.component.html',
  styleUrl: './autocomplete-search.component.scss'
})
export class AutocompleteSearchComponent {
  selectedProduct!: any;

  @Input() filteredProducts: any;
  @Output() filterProduct = new EventEmitter<AutoCompleteCompleteEvent>();
  @Output() selectProduct = new EventEmitter<any>();

  onFilterProduct(event: AutoCompleteCompleteEvent) {
    this.filterProduct.emit(event);
  }

  onProductSelected(event: any) {
    this.selectProduct.emit(event);
  }
}
