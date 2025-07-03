import { Component } from '@angular/core';
import {CampaignSectionComponent} from "../campaign-section/campaign-section.component";
import {PopularCategoriesComponent} from "../popular-categories/popular-categories.component";
import {AllProductsComponent} from "../all-products/all-products.component";
import {TopBrandsComponent} from "../top-brands/top-brands.component";
import {NewProductsComponent} from "../new-products/new-products.component";
import {BestDealsProductsComponent} from "../best-deals-products/best-deals-products.component";
import {PopularProductsComponent} from "../popular-products/popular-products.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CampaignSectionComponent,
    PopularCategoriesComponent,
    AllProductsComponent,
    TopBrandsComponent,
    NewProductsComponent,
    BestDealsProductsComponent,
    PopularProductsComponent,
    FooterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
