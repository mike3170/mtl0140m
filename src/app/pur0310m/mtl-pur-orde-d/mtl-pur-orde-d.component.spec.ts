import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtlPurOrdeDComponent } from './mtl-pur-orde-d.component';

describe('MtlPurOrdeDComponent', () => {
  let component: MtlPurOrdeDComponent;
  let fixture: ComponentFixture<MtlPurOrdeDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlPurOrdeDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtlPurOrdeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
