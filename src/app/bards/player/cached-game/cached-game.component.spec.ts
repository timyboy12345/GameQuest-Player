import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CachedGameComponent } from './cached-game.component';

describe('CachedGameComponent', () => {
  let component: CachedGameComponent;
  let fixture: ComponentFixture<CachedGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CachedGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CachedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
