import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-best-deals-products',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './best-deals-products.component.html',
  styleUrl: './best-deals-products.component.scss'
})
export class BestDealsProductsComponent {
  bestDeals = [
    {
      brand: 'Chaka',
      weight: '1000 gm',
      name: 'Chaka Super white Premium Detergent powder',
      oldPrice: 120,
      newPrice: 110,
      image: 'assets/images/chaka-deal.png'
    },
    {
      brand: 'Meril',
      weight: '150 ml',
      name: 'Meril Olive Oil',
      oldPrice: 420,
      newPrice: 320,
      image: 'assets/images/olive-oil-offer.png'
    },
    {
      brand: 'White Plus',
      weight: '50 ml',
      name: 'White Plus Kids',
      oldPrice: 120,
      newPrice: 110,
      image: 'assets/images/white-plus-offer.png'
    }
  ];
}
