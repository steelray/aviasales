import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorMessageComponent } from '@components/error-message/error-message.component';
import { HttpErrorInterceptor } from '@core/interceptors/http-error.interceptor';
import localeRu from '@angular/common/locales/ru';
import localeUz from '@angular/common/locales/uz-Latn';
import { registerLocaleData } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { getLangFromParams } from '@core/utils/get-lang.util';
import { NgxMetrikaModule } from '@kolkov/ngx-metrika';


registerLocaleData(localeRu);
registerLocaleData(localeUz);


export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: getLangFromParams(),
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMetrikaModule.forRoot({
      id: 35896610,
      webvisor: false,
      triggerEvent: true,
      defer: false,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
    })
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: getLangFromParams()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
