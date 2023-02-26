import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  // Get weather data service
  @Input() getWeatherData: () => void;

  // Input value from user
  @Input() cityName: string;

  // Output event to parent element
  @Output() inputEvent = new EventEmitter<string>();

  // Output handler to pass to parent
  onInputValueChange = () => {
    this.inputEvent.emit(this.cityName);
  };
}
