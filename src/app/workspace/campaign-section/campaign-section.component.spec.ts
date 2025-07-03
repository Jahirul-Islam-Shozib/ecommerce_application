import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignSectionComponent } from './campaign-section.component';

describe('CampaignSectionComponent', () => {
  let component: CampaignSectionComponent;
  let fixture: ComponentFixture<CampaignSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampaignSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampaignSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
