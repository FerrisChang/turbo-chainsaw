import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFullViewComponent } from './company-full-view.component';

describe('CompanyFullViewComponent', () => {
  let component: CompanyFullViewComponent;
  let fixture: ComponentFixture<CompanyFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyFullViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
