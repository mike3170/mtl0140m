import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtlPurOrdeMComponent } from './mtl-pur-orde-m.component';

describe('MtlPurOrdeMComponent', () => {
  let component: MtlPurOrdeMComponent;
  let fixture: ComponentFixture<MtlPurOrdeMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlPurOrdeMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtlPurOrdeMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
