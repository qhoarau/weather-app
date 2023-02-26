import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SearchbarComponent } from './searchbar.component';
import { FormsModule } from '@angular/forms';
describe('SearchbarComponent', () => {
  let component: SearchbarComponent;
  let fixture: ComponentFixture<SearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchbarComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the cityName property when a user inputs a value into the search box', () => {
    //Get html element
    const searchBox = fixture.debugElement.query(By.css('input')).nativeElement;

    // fire input event
    searchBox.value = 'Paris';
    searchBox.dispatchEvent(new Event('input'));

    // Detect new input value
    fixture.detectChanges();

    // Perform tests
    expect(component.cityName).toBe('Paris');
  });
});
