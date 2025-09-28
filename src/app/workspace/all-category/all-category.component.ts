import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Checkbox} from "primeng/checkbox";
import {Divider} from "primeng/divider";
import {NgClass, NgForOf} from "@angular/common";

export type ProductCategoryKey =
  | 'BEVERAGES'
  | 'RICE_GRAINS'
  | 'COOKING_ITEMS'
  | 'SPICES_MASALA'
  | 'SAUCES_PICKLES'
  | 'SNACKS'
  | 'SKIN_CARE'
  | 'BABY_CARE'
  | 'CLEANING'
  | 'PERSONAL_CARE'
  | 'HEALTH_CARE'
  | 'OTHERS';

export interface CategoryItem {
  key: ProductCategoryKey;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-all-category',
  standalone: true,
  imports: [
    Divider,
    NgForOf,
    NgClass
  ],
  templateUrl: './all-category.component.html',
  styleUrl: './all-category.component.scss'
})

export class AllCategoryComponent implements OnInit, OnChanges {

  @Input() selectedCategories: ProductCategoryKey[]  = [];
  @Output() categoriesChange = new EventEmitter<ProductCategoryKey[]>();

  categories: CategoryItem[] = [
    { key: 'BEVERAGES',      label: 'Beverages',      icon: 'pi-cup' },
    { key: 'RICE_GRAINS',    label: 'Rice',           icon: 'pi-box' },
    { key: 'COOKING_ITEMS',  label: 'Cooking items',  icon: 'pi-sliders-h' },
    { key: 'SPICES_MASALA',  label: 'Spices & Masala',icon: 'pi-sparkles' },
    { key: 'SAUCES_PICKLES', label: 'Sauces & Pickles',icon: 'pi-tags' },
    { key: 'SNACKS',         label: 'Snacks',         icon: 'pi-star' },
    { key: 'SKIN_CARE',      label: 'Skin Care',      icon: 'pi-heart' },
    { key: 'BABY_CARE',      label: 'Baby Care',      icon: 'pi-user' },
    { key: 'CLEANING',       label: 'Cleaning',       icon: 'pi-filter' },
    { key: 'PERSONAL_CARE',  label: 'Personal Care',  icon: 'pi-id-card' },
    { key: 'HEALTH_CARE',    label: 'Health Care',    icon: 'pi-shield' },
    { key: 'OTHERS',         label: 'Others',         icon: 'pi-ellipsis-h' },
  ];

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes['selectedCategory']) {
    //   this.selectedCategory = changes['selectedCategory'].currentValue
    //   console.log(this.selectedCategory);
    // }
  }

  isSelected(key: ProductCategoryKey): boolean {
    return this.selectedCategories.includes(key);
  }


  selectCategory(key: ProductCategoryKey) {
    const next = this.isSelected(key)
      ? this.selectedCategories.filter(x => x !== key)
      : [...this.selectedCategories, key];

    this.categoriesChange.emit(next);
  }

  onReset() {
    this.categoriesChange.emit([]);
  }
}
