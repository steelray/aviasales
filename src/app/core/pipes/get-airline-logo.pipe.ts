import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { environment } from '@environments/environment';
@Pipe({
  name: 'getAirlineLogo'
})
export class GetAirlineLogo implements PipeTransform {
  cdn = environment.airlineLogoEndpoint;
  constructor(
    private sanitization: DomSanitizer
  ) { }

  transform(carrier: string): SafeUrl {
    return this.sanitization.bypassSecurityTrustUrl(`${this.cdn}/150/40/${carrier}.png`);
  }

}
