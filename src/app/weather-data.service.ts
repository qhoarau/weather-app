import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import OWAPIResponse from './models/OWAPIResponse';
import Error from './models/Error';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  // OpenWeatherAPI with city params
  private apiUrl =
    'http://api.openweathermap.org/data/2.5/weather?q={city}&appid=5b3d01b3d912dc17fd6ba67344bd713f&units=metric';

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<OWAPIResponse> {
    // Replace city param with user input
    const url = this.apiUrl.replace('{city}', cityName);

    // Return response
    return this.http
      .get<OWAPIResponse>(url)
      .pipe(catchError((error: Error) => throwError(() => error)));
  }
}
