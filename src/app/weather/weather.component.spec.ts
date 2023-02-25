import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { WeatherComponent } from './weather.component';

import { WeatherDataService } from '../weather-data.service';
import { of, delay, switchMap, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherDataService: jasmine.SpyObj<WeatherDataService>;

  beforeEach(async () => {
    weatherDataService = jasmine.createSpyObj('WeatherDataService', [
      'getWeatherData',
    ]);
    await TestBed.configureTestingModule({
      declarations: [WeatherComponent],
      imports: [FormsModule],
      providers: [
        { provide: WeatherDataService, useValue: weatherDataService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the cityName property when a user inputs a value into the search box', () => {
    const searchBox = fixture.debugElement.query(By.css('input')).nativeElement;

    searchBox.value = 'Paris';
    searchBox.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.cityName).toBe('Paris');
  });

  it('should display error message when WeatherDataService returns an error', async () => {
    const errorMessage = {
      error: {
        message: 'An error occurred',
      },
    };
    weatherDataService.getWeatherData.and.returnValue(
      throwError(() => errorMessage)
    );

    component.cityName = 'invalid-city-name';

    component.getWeatherData();

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.weatherData).toBeNull();
    expect(component.errorMessage).toBe(errorMessage.error.message);
  });

  it('should display weather data when WeatherDataService returns data', async () => {
    const weatherData = {
      weather: [
        {
          id: 501,
          main: 'Rain',
          description: 'moderate rain',
          icon: '10d',
        },
      ],
      base: 'stations',
      main: {
        temp: 12.5,
        feels_like: 11,
        temp_min: 10,
        temp_max: 14,
        pressure: 1015,
        humidity: 64,
        sea_level: 1015,
        grnd_level: 933,
      },
      name: 'London',
    };

    weatherDataService.getWeatherData.and.returnValue(of(weatherData));

    component.cityName = 'London';
    component.getWeatherData();

    await fixture.whenStable();

    fixture.detectChanges();

    expect(component.weatherData).toEqual({
      name: 'London',
      temp_celcius: '13',
      temp_feels_like: '11',
      humidity: '64',
      temp_min: '10',
      temp_max: '14',
      isDay: true,
      icon: '10d',
    });
  });
});
