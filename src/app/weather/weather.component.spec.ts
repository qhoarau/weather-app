import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherComponent } from './weather.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { WeatherDataService } from '../weather-data.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import OWAPIResponse from '../models/OWAPIResponse';
import WeatherData from '../models/WeatherData';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  let weatherDataService: jasmine.SpyObj<WeatherDataService>;

  beforeEach(async () => {
    weatherDataService = jasmine.createSpyObj('WeatherDataService', [
      'getWeatherData',
    ]);
    await TestBed.configureTestingModule({
      declarations: [
        WeatherComponent,
        WeatherWidgetComponent,
        SearchbarComponent,
        LoaderComponent,
        ErrorMessageComponent,
      ],
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

  it('should display error message when WeatherDataService returns an error', async () => {
    // Init variables
    const errorMessage = {
      error: {
        message: 'An error occurred',
      },
    };

    // Mock API response
    weatherDataService.getWeatherData.and.returnValue(
      throwError(() => errorMessage)
    );

    // Init component variables
    component.cityName = 'invalid-city-name';

    // Perform the fake request
    component.getWeatherData();

    // Wait for fake API response
    await fixture.whenStable();

    // Detect changes
    fixture.detectChanges();

    // Perform tests
    expect(component.weatherData).toBeNull();
    expect(component.errorMessage).toBe(errorMessage.error.message);
  });

  it('should display weather data when WeatherDataService returns data', async () => {
    // Init variables
    const weatherData: OWAPIResponse = {
      coord: {
        lon: 10.99,
        lat: 44.34,
      },
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
        temp: 298.48,
        feels_like: 298.74,
        temp_min: 297.56,
        temp_max: 300.05,
        pressure: 1015,
        humidity: 64,
        sea_level: 1015,
        grnd_level: 933,
      },
      visibility: 10000,
      wind: {
        speed: 0.62,
        deg: 349,
        gust: 1.18,
      },
      rain: {
        '1h': 3.16,
      },
      clouds: {
        all: 100,
      },
      dt: 1661870592,
      sys: {
        type: 2,
        id: 2075663,
        country: 'IT',
        sunrise: 1661834187,
        sunset: 1661882248,
      },
      timezone: 7200,
      id: 3163858,
      name: 'Zocca',
      cod: 200,
    };

    // Mock API response
    weatherDataService.getWeatherData.and.returnValue(of(weatherData));

    // Init component variables
    component.cityName = 'London';

    // Perform the fake request
    component.getWeatherData();

    // Wait for fake API response
    await fixture.whenStable();

    // Detect changes
    fixture.detectChanges();

    // Expected results
    const expectedResult: WeatherData = {
      name: weatherData.name,
      temp_celcius: weatherData.main.temp.toFixed(0).toString(),
      temp_feels_like: weatherData.main.feels_like.toFixed(0).toString(),
      humidity: weatherData.main.humidity.toFixed(0).toString(),
      temp_min: weatherData.main.temp_min.toFixed(0).toString(),
      temp_max: weatherData.main.temp_max.toFixed(0).toString(),
      isDay: true,
      icon: '10d',
    };

    // Perform tests
    expect(component.weatherData).toEqual(expectedResult);
  });
});
