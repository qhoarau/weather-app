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
    // Init component variables
    component.isLoading = true;

    // Detect new component variables
    fixture.detectChanges();

    // Get html element
    const loadingElement = fixture.debugElement.query(
      By.css('div[data-test-id="loader"]')
    );

    // Perform tests
    expect(loadingElement).toBeTruthy();
  });

  it('should not display spinner if not loading', () => {
    // Init component variables
    component.isLoading = false;

    // Detect new component variables
    fixture.detectChanges();

    // Get html element
    const loadingElement = fixture.debugElement.query(
      By.css('div[data-test-id="loader"]')
    );

    // Perform tests
    expect(loadingElement).toBeNull();
  });
});
