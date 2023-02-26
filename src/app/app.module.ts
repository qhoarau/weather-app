import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherDataService } from './weather-data.service';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { LoaderComponent } from './loader/loader.component';
import { ErrorMessageComponent } from './error-message/error-message.component';

@NgModule({
  declarations: [AppComponent, WeatherComponent, SearchbarComponent, WeatherWidgetComponent, LoaderComponent, ErrorMessageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [WeatherDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
