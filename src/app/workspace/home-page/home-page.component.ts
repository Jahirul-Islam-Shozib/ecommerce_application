import {Component, OnInit} from '@angular/core';
import {CampaignSectionComponent} from "../campaign-section/campaign-section.component";
import {PopularCategoriesComponent} from "../popular-categories/popular-categories.component";
import {AllProductsComponent} from "../all-products/all-products.component";
import {TopBrandsComponent} from "../top-brands/top-brands.component";
import {NewProductsComponent} from "../new-products/new-products.component";
import {BestDealsProductsComponent} from "../best-deals-products/best-deals-products.component";
import {PopularProductsComponent} from "../popular-products/popular-products.component";
import {FooterComponent} from "../footer/footer.component";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";
import {AutocompleteSearchComponent} from "../autocomplete-search/autocomplete-search.component";
import {ProductService} from "../../service/product.service";

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
    FooterComponent,
    FormsModule,
    InputText,
    AutocompleteSearchComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  value!: string;

  filteredProducts: any[] = [];
  products: any[] = [];

  constructor(public productService: ProductService,) {
  }

  ngOnInit(): void {
    // this.productService.getAllProducts().subscribe(data => {
    //   this.products = data;
    // });
    // console.log(this.products)
  }

  filterProduct(event: any) {
    console.log(event);
    const query = (event.query || '').toLowerCase();

    this.filteredProducts = this.products.filter((product: any) =>
      product?.productName?.toLowerCase().includes(query)
    );

    console.log(this.filteredProducts);
  }

  onProductSelect(product: any) {
    console.log(product.value.productName);
  }
}
