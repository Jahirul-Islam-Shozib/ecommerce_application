import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Checkbox} from "primeng/checkbox";
import {Divider} from "primeng/divider";

@Component({
  selector: 'app-all-brands',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    Checkbox,
    Divider,
  ],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.scss'
})
export class AllBrandsComponent {
  @Input() selectedBrandNames: any[] = [];

  @Output() brandsChange = new EventEmitter<string[]>();

  brandNames = [
    {name: 'Aaram', key: 'Aaram'},
    {name: 'Chaka', key: 'Chaka'},
    {name: 'Chamak', key: 'Chamak'},
    {name: 'Chashi', key: 'Chashi'},
    {name: 'Chopstick', key: 'Chopstick'},
    {name: 'Femina', key: 'Femina'},
    {name: 'Jui', key: 'Jui'},
    {name: 'Jonaki', key: 'Jonaki'},
    {name: 'Kool', key: 'Kool'},
    {name: 'Magic', key: 'Magic'},
    {name: 'Maxclean', key: 'Maxclean'},
    {name: 'Meril', key: 'Meril'},
    {name: 'Maya', key: 'Maya'},
    {name: 'Orvana', key: 'Orvana'},
    {name: 'Radhuni', key: 'Radhuni'},
    {name: 'Revive', key: 'Revive'},
    {name: 'Ruchi', key: 'Ruchi'},
    {name: 'Select', key: 'Select'},
    {name: 'Senora', key: 'Senora'},
    {name: 'Sepnil', key: 'Sepnil'},
    {name: 'Shakti', key: 'Shakti'},
    {name: 'Spring', key: 'Spring'},
    {name: 'Supermom', key: 'Supermom'},
    {name: 'White', key: 'White'},
    {name: 'Xpel', key: 'Xpel'},
    {name: 'Zerocal', key: 'Zerocal'}
  ];


  toggleBrand(value: string) {
    const index = this.selectedBrandNames.indexOf(value);
    if (index > -1) {
      this.selectedBrandNames = this.selectedBrandNames.filter(v => v !== value);
    } else {
      this.selectedBrandNames = [...this.selectedBrandNames, value];
    }
    console.log(this.selectedBrandNames);
    this.brandsChange.emit(this.selectedBrandNames);

  }

  onBrandsModelChange(brands: string[]) {
    this.selectedBrandNames = brands;
    this.brandsChange.emit(brands);
  }

  onReset() {
    this.selectedBrandNames = [];
    this.brandsChange.emit([]);
  }
}
