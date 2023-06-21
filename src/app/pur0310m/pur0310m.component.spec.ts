import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pur0310mComponent } from './pur0310m.component';

describe('Pur0310mComponent', () => {
  let component: Pur0310mComponent;
  let fixture: ComponentFixture<Pur0310mComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pur0310mComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pur0310mComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
