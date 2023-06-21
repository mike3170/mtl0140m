import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtlmastComponent } from './mtlmast.component';

describe('MtlmastComponent', () => {
  let component: MtlmastComponent;
  let fixture: ComponentFixture<MtlmastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MtlmastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MtlmastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
