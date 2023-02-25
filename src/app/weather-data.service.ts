import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private apiUrl =
    'http://api.openweathermap.org/data/2.5/weather?q={city}&appid=5b3d01b3d912dc17fd6ba67344bd713f&units=metric';

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<any> {
    const url = this.apiUrl.replace('{city}', cityName);
    return this.http
      .get<any>(url)
      .pipe(catchError((error) => throwError(() => error)));
  }
}
