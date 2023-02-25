import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @Input() getWeatherData: () => void;
  @Input() cityName: string;
  @Output() inputEvent = new EventEmitter<string>();

  onInputValueChange = () => {
    this.inputEvent.emit(this.cityName);
  };
}
