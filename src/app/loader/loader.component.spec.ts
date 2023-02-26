import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display spinner if loading', () => {
    component.isLoading = true;

    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('div[data-test-id="loader"]')
    );

    expect(loadingElement).toBeTruthy();
  });

  it('should not display spinner if not loading', () => {
    component.isLoading = false;

    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('div[data-test-id="loader"]')
    );

    expect(loadingElement).toBeNull();
  });
});
