import { Component, OnInit, Input } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  // variables that holds all weather data
  weatherData: any;

  // errorMessage to display
  errorMessage: string;

  // is loading data from services boolean
  isLoading: boolean;

  // user input
  @Input() cityName: string;

  constructor(private weatherDataService: WeatherDataService) {}

  // Set weather data object and map property from API response
  setWeatherData = (data: any): void => {
    this.weatherData = {};
    // checking id it's day or night to display sun or moon
    this.weatherData.isDay = data.weather[0].icon.split('').includes('d');
    this.weatherData.temp_celcius = data.main.temp.toFixed(0);
    this.weatherData.temp_min = data.main.temp_min.toFixed(0);
    this.weatherData.temp_max = data.main.temp_max.toFixed(0);
    this.weatherData.temp_feels_like = data.main.feels_like.toFixed(0);
    this.weatherData.humidity = data.main.humidity.toFixed(0);
    this.weatherData.name = data.name;
    // get icon name to know if it's raining or cloudy...
    this.weatherData.icon = data.weather[0].icon;
  };

  // Set user input from child search bar
  onInputValueChange = (inputValueFromChild: string) => {
    this.cityName = inputValueFromChild;
  };

  // Call OpenWeatherAPI to get weather data
  getWeatherData = (): void => {
    // set is loading to true
    this.isLoading = true;
    this.weatherDataService.getWeatherData(this.cityName).subscribe({
      next: (data: any) => {
        // set weather data object with api response
        this.setWeatherData(data);
        // set is loading to false
        this.isLoading = false;
        // no error message
        this.errorMessage = '';
      },
      error: (error: any) => {
        // set error message
        this.errorMessage = error.error.message;
        // set is loading to false
        this.isLoading = false;
        // no weather data cause error
        this.weatherData = null;
      },
    });
  };
}
