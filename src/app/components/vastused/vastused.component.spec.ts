import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VastusedComponent } from './vastused.component';

describe('VastusedComponent', () => {
  let component: VastusedComponent;
  let fixture: ComponentFixture<VastusedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VastusedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VastusedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
