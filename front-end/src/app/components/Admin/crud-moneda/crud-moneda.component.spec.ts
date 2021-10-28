import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMonedaComponent } from './crud-moneda.component';

describe('CrudMonedaComponent', () => {
  let component: CrudMonedaComponent;
  let fixture: ComponentFixture<CrudMonedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudMonedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudMonedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
