import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LodgingEditComponent } from './lodging-edit.component';

describe('LodgingEditComponent', () => {
  let component: LodgingEditComponent;
  let fixture: ComponentFixture<LodgingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LodgingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LodgingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
