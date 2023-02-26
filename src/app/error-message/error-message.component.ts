import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css'],
})
export class ErrorMessageComponent {
  // error message to show
  @Input() errorMessage: string;

  // is loading data from services boolean
  @Input() isLoading: boolean;
}
