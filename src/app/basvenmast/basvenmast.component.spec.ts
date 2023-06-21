import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasvenmastComponent } from './basvenmast.component';

describe('BasvenmastComponent', () => {
  let component: BasvenmastComponent;
  let fixture: ComponentFixture<BasvenmastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasvenmastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasvenmastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
