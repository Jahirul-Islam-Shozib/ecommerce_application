import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Button} from "primeng/button";

@Component({
  selector: 'app-popular-categories',
  standalone: true,
  imports: [
    NgForOf,
    Button,
  ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  categoryImages: string[] = [
    'aaram.png',
    'chashi-logo.png',
    'chopstick-logo.jpg',
    'radhuni-logo.jpg',
    'ruchi-logo.png',
    'meril-logo.png',
    'maya-logo.jpg',
    'magic-logo.png',
    'sepnil-logo.png',
    'xpel-logo.png',
    'chaka-logo.jpg',
    'senora-logo.png',
    'kool-logo.jpeg',
    'jui-logo.png',
    'chmak-logo.png',
    // Add more filenames as needed
  ];
  constructor() {}

  ngOnInit(): void {
  }

  scrollCategories(direction: 'left' | 'right') {
    const scrollAmount = 300; // Adjust this value as needed
    const container = this.scrollContainer.nativeElement as HTMLElement;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }
}
