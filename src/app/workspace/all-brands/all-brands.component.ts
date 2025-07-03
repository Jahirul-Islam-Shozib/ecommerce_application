import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Checkbox} from "primeng/checkbox";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-all-brands',
  standalone: true,
  imports: [
    NgForOf,
    Checkbox,
    FormsModule
  ],
  templateUrl: './all-brands.component.html',
  styleUrl: './all-brands.component.scss'
})
export class AllBrandsComponent {
  selectedBrandnames: any[] = [];

  brandNames = [
    {name: 'Ruchi', key: 'R'},
    {name: 'Radhuni', key: 'R'},
    {name: 'Meril', key: 'M'},
    {name: 'Sepnil', key: 'S'},
    {name: 'Maya', key: 'M'},
    {name: 'Maxclean', key: 'M'},
    {name: 'Jui', key: 'J'},
    {name: 'Chaka', key: 'C'},
    {name: 'Supermom', key: 'S'},
    {name: 'Kool', key: 'K'}
  ]
}
