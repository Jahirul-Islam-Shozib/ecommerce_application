import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {Carousel} from "primeng/carousel";
import {PrimeTemplate} from "primeng/api";
import {isPlatformBrowser, NgForOf} from "@angular/common";

@Component({
  selector: 'app-campaign-section',
  standalone: true,
  imports: [
    Carousel,
    PrimeTemplate,
    NgForOf,
  ],
  templateUrl: './campaign-section.component.html',
  styleUrl: './campaign-section.component.scss'
})
export class CampaignSectionComponent implements OnInit, OnDestroy {
  imageList = [
    {src: 'assets/images/radhuni-1.png', alt: 'Image 1'},
    {src: 'assets/images/chashi-1.jpg', alt: 'Image 2'},
    {src: 'assets/images/chopstick-1.jpg', alt: 'Image 3'},
    {src: 'assets/images/meril-1.png', alt: 'Image 4'},
    {src: 'assets/images/jotno-1.png', alt: 'Image 5'},
    {src: 'assets/images/ruchi-1.jpg', alt: 'Image 6'}
  ];
  currentIndex = 0;
  intervalId?: any;
  isBrowser: boolean;

constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);
}

  ngOnInit(): void {
    if (this.isBrowser) {
      this.intervalId = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.imageList.length;
      }, 5000);
    }
  }

  ngOnDestroy() {
    if (this.isBrowser && this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
