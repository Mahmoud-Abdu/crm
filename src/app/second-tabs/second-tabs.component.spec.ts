import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondTabsComponent } from './second-tabs.component';

describe('SecondTabsComponent', () => {
  let component: SecondTabsComponent;
  let fixture: ComponentFixture<SecondTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
