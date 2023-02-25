import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.css'],
})
export class WeatherWidgetComponent {
  @Input() weatherData: any;
  @Input() isLoading: boolean;
  @Input() errorMessage: string;
}
