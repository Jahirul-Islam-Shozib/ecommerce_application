import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-new-products',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.scss'
})
export class NewProductsComponent {
  newProducts = [
    {
      name: 'Maya All Natural Olive Oil',
      price: 120,
      image: 'assets/images/maya/Maya-Olive-Oil.png'
    },
    {
      name: 'Maya Rosehip Oil & Acne Control Gel Cream',
      price: 80,
      image: 'assets/images/maya/Maya-Rosehip-Cream-Product-img.png'
    },
    {
      name: 'Maya Argan Oil',
      price: 60,
      image: 'assets/images/maya/Maya-Argan-Oil.png'
    },
    {
      name: 'Maya Castor Oil',
      price: 150,
      image: 'assets/images/maya/Maya-Castor-Oil.png'
    }
  ];
}
