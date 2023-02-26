import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message.component';
import { By } from '@angular/platform-browser';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error if errorMessage is set and not loading', () => {
    component.errorMessage = 'An error occured';
    component.isLoading = false;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(
      By.css('div[data-test-id="error-message"]')
    ).nativeElement;

    expect(errorElement).toBeTruthy();
    expect(errorElement.innerHTML).toContain(component.errorMessage);
  });

  it('should not display error if errorMessage is not set', () => {
    component.errorMessage = '';
    component.isLoading = false;
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(
      By.css('div[data-test-id="error-message"]')
    );

    expect(errorElement).toBeTruthy();
  });
});
