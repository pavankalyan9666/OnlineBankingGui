import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyCarousalEffectComponent } from './body-carousal-effect.component';

describe('BodyCarousalEffectComponent', () => {
  let component: BodyCarousalEffectComponent;
  let fixture: ComponentFixture<BodyCarousalEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyCarousalEffectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyCarousalEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
