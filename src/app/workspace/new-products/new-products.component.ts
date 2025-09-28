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
      name: 'Zerocal Zero Sugar Orange drink powder - 500 gm',
      price: 375,
      image: 'assets/images/zerocal-orange-jar-pack.png'
    },
    {
      name: 'Revive Glow Up Lotion  - 200 ml',
      price: 233,
      image: 'assets/images/Revive-Glowup-Lotion-pack.png'
    },
    {
      name: 'Maya Rosehip Oil & Acne Control Gel Cream - 50 ml',
      price: 230,
      image: 'assets/images/maya/Maya-Rosehip-Cream-Product-img.png'
    },
    {
      name: 'MAYA All Natural Moroccan Argan Oil -30 ml',
      price: 850,
      image: 'assets/images/maya/Maya-Argan-Oil.png'
    },
    {
      name: 'MAYA All Natural Cold-pressed Castor Oil -120 ml',
      price: 450,
      image: 'assets/images/maya/Maya-Castor-Oil.png'
    }
  ];
}
