import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetStringComponent } from './set-string-component.component';

describe('SetStringComponent', () => {
  let component: SetStringComponent;
  let fixture: ComponentFixture<SetStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetStringComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
