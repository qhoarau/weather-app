import { Component, OnInit, Input } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  weatherData: any;
  errorMessage: string;
  isLoading: boolean;
  @Input() cityName: string;

  constructor(private weatherDataService: WeatherDataService) {}

  setWeatherData = (data: any): void => {
    this.weatherData = {};
    this.weatherData.isDay = data.weather[0].icon.split('').includes('d');
    this.weatherData.temp_celcius = data.main.temp.toFixed(0);
    this.weatherData.temp_min = data.main.temp_min.toFixed(0);
    this.weatherData.temp_max = data.main.temp_max.toFixed(0);
    this.weatherData.temp_feels_like = data.main.feels_like.toFixed(0);
    this.weatherData.humidity = data.main.humidity.toFixed(0);
    this.weatherData.name = data.name;
    this.weatherData.icon = data.weather[0].icon;
  };

  onInputValueChange = (inputValueFromChild: string) => {
    this.cityName = inputValueFromChild;
  };

  getWeatherData = (): void => {
    this.isLoading = true;
    this.weatherDataService.getWeatherData(this.cityName).subscribe({
      next: (data: any) => {
        this.setWeatherData(data);
        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error: any) => {
        this.errorMessage = error.error.message;
        this.isLoading = false;
        this.weatherData = null;
      },
    });
  };
}
