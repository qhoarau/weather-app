import { TestBed } from '@angular/core/testing';

import { WeatherDataService } from './weather-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WeatherDataService', () => {
  let service: WeatherDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WeatherDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
