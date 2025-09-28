import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Button} from "primeng/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-campaign-section',
  standalone: true,
  imports: [
    NgForOf,
    Button,
    RouterLink,
  ],
  templateUrl: './campaign-section.component.html',
  styleUrl: './campaign-section.component.scss'
})
export class CampaignSectionComponent implements OnInit, OnDestroy {
  imageList = [
    {src: 'assets/images/zerocal-tang.jpg', alt: 'Image 8'},
    {src: 'assets/images/ruchi-package.jpg', alt: 'Image 9'},
    {src: 'assets/images/revive-lotion.jpg', alt: 'Image 10'},
    {src: 'assets/images/radhuni-1.png', alt: 'Image 1'},
    {src: 'assets/images/chashi-1.jpg', alt: 'Image 2'},
    {src: 'assets/images/chopstick-1.jpg', alt: 'Image 3'},
    {src: 'assets/images/meril-1.png', alt: 'Image 4'},
    {src: 'assets/images/jotno-1.png', alt: 'Image 5'},
    {src: 'assets/images/ruchi-1.jpg', alt: 'Image 6'},
    {src: 'assets/images/shc-app-image.jpg', alt: 'Image 7'},
  ];
  currentIndex = 0;
  intervalId?: any;

  constructor() {
  }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
