import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetComponent } from './weather-widget.component';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { By } from '@angular/platform-browser';

describe('WeatherWidgetComponent', () => {
  let component: WeatherWidgetComponent;
  let fixture: ComponentFixture<WeatherWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        WeatherWidgetComponent,
        ErrorMessageComponent,
        LoaderComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display data if weatherData is set', () => {
    component.weatherData = {
      name: 'London',
      temp_celcius: '13',
      temp_feels_like: '11',
      humidity: '64',
      temp_min: '10',
      temp_max: '14',
      isDay: true,
      icon: '10d',
    };
    component.isLoading = false;
    component.errorMessage = '';

    fixture.detectChanges();

    const mainTempElement = fixture.debugElement.query(
      By.css('div[data-test-id="main-temp"]')
    ).nativeElement;

    const minTempElement = fixture.debugElement.query(
      By.css('div[data-test-id="min-temp"]')
    ).nativeElement;

    const maxTempElement = fixture.debugElement.query(
      By.css('div[data-test-id="max-temp"]')
    ).nativeElement;

    const cityNameElement = fixture.debugElement.query(
      By.css('div[data-test-id="city-name"]')
    ).nativeElement;

    const humidityElement = fixture.debugElement.query(
      By.css('div[data-test-id="humidity"]')
    ).nativeElement;

    expect(mainTempElement.innerHTML).toContain(
      component.weatherData.temp_celcius
    );
    expect(minTempElement.innerHTML).toContain(component.weatherData.temp_min);
    expect(maxTempElement.innerHTML).toContain(component.weatherData.temp_max);
    expect(cityNameElement.innerHTML).toContain(component.weatherData.name);
    expect(humidityElement.innerHTML).toContain(component.weatherData.humidity);
  });

  // it('should display spinner if loading', () => {
  //   component.weatherData = null;
  //   component.isLoading = true;
  //   component.errorMessage = '';

  //   fixture.detectChanges();

  //   const loadingElement = fixture.debugElement.query(
  //     By.css('div[data-test-id="loader"]')
  //   );

  //   const widgetElement = fixture.debugElement.query(
  //     By.css('div[data-test-id="widget-container"]')
  //   );

  //   const errorElement = fixture.debugElement.query(
  //     By.css('div[data-test-id="error-message"]')
  //   );

  //   expect(loadingElement).toBeTruthy();
  //   expect(errorElement).toBeNull();
  //   expect(widgetElement).toBeNull();
  // });

  it('should display error if no weatherData and not loading and errorMessage is set', () => {
    component.weatherData = null;
    component.isLoading = false;
    component.errorMessage = 'An error occured';

    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(
      By.css('div[data-test-id="loader"]')
    );

    const widgetElement = fixture.debugElement.query(
      By.css('div[data-test-id="widget-container"]')
    );

    const errorElement = fixture.debugElement.query(
      By.css('div[data-test-id="error-message"]')
    );

    expect(loadingElement).toBeNull();
    expect(widgetElement).toBeNull();
    expect(errorElement).toBeTruthy();
  });
});
