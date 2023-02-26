import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent {
  // Weather data object
  @Input() weatherData: any;

  // is loading data from services boolean
  @Input() isLoading: boolean;

  // error message to show
  @Input() errorMessage: string;
}
