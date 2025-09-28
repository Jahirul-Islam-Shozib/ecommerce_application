import {Component, OnInit} from '@angular/core';
import {CampaignSectionComponent} from "../campaign-section/campaign-section.component";
import {TopBrandsComponent} from "../top-brands/top-brands.component";
import {NewProductsComponent} from "../new-products/new-products.component";
import {PopularProductsComponent} from "../popular-products/popular-products.component";
import {FormsModule} from "@angular/forms";
import {AutocompleteSearchComponent} from "../autocomplete-search/autocomplete-search.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CampaignSectionComponent,
    TopBrandsComponent,
    NewProductsComponent,
    PopularProductsComponent,
    FormsModule,
    AutocompleteSearchComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  value!: string;
  constructor() {
  }

  ngOnInit(): void {
  }

}
