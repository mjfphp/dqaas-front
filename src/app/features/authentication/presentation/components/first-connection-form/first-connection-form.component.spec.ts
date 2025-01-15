import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstConnectionFormComponent } from './first-connection-form.component';

describe('FirstConnectionFormComponent', () => {
  let component: FirstConnectionFormComponent;
  let fixture: ComponentFixture<FirstConnectionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstConnectionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstConnectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
