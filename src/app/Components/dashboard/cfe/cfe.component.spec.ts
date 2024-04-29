import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfeComponent } from './cfe.component';

describe('CfeComponent', () => {
  let component: CfeComponent;
  let fixture: ComponentFixture<CfeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CfeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
