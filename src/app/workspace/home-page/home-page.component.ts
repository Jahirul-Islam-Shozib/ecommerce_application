import { Component } from '@angular/core';
import {CampaignSectionComponent} from "../campaign-section/campaign-section.component";
import {PopularCategoriesComponent} from "../popular-categories/popular-categories.component";
import {AllProductsComponent} from "../all-products/all-products.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CampaignSectionComponent,
    PopularCategoriesComponent,
    AllProductsComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
