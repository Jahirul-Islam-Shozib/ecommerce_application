import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestDealsProductsComponent } from './best-deals-products.component';

describe('BestDealsProductsComponent', () => {
  let component: BestDealsProductsComponent;
  let fixture: ComponentFixture<BestDealsProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestDealsProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestDealsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
