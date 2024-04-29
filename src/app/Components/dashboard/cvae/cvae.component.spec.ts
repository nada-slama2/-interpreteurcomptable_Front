import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvaeComponent } from './cvae.component';

describe('CvaeComponent', () => {
  let component: CvaeComponent;
  let fixture: ComponentFixture<CvaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvaeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
