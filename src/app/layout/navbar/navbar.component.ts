import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {Button, ButtonDirective} from "primeng/button";
import {AutoComplete} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {Select} from "primeng/select";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    ButtonDirective,
    Button,
    AutoComplete,
    FormsModule,
    DropdownModule,
    Select
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  selectedSearch: any;
  searchOptions = [
    { label: 'Pizza', value: 'pizza' },
    { label: 'Burger', value: 'burger' },
    { label: 'Pasta', value: 'pasta' },
    { label: 'Pepsi', value: 'pepsi' },
    { label: 'Coke', value: 'coke' }
  ];

}
