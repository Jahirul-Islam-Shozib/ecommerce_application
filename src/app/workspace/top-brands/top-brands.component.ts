import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-top-brands',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './top-brands.component.html',
  styleUrl: './top-brands.component.scss'
})
export class TopBrandsComponent {
  brands = [
    {
      name: 'Ruchi',
      image: 'assets/images/category-logo/ruchi-logo.png'
    },
    {
      name: 'Radhuni',
      image: 'assets/images/category-logo/radhuni-logo.jpg'
    },
    {
      name: 'Meril',
      image: 'assets/images/category-logo/meril-logo.png'
    },
    {
      name: 'Sepnil',
      image: 'assets/images/category-logo/sepnil-logo.png'
    },
    {
      name: 'Maya',
      image: 'assets/images/category-logo/maya-logo.jpg'
    }
  ];
}
