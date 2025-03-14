import { AfterViewInit, Component, OnInit, Self } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { NgOnDestroy } from '@core/services/destroy.service';
import { UrlService } from '@core/services/url.service';
import { TranslateService } from '@ngx-translate/core';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgOnDestroy]
})
export class AppComponent implements OnInit {
  private prevUrl = null;
  private currentUrl = null;
  constructor(
    private router: Router,
    @Self() private onDestroy$: NgOnDestroy,
    private urlService: UrlService,
    private titleService: Title,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.onDestroy$)
    ).subscribe((event: NavigationEnd) => {
      this.prevUrl = this.currentUrl;
      this.currentUrl = event.url;
      this.urlService.setPreviousUrl(this.prevUrl);
    });
    this.translateService.get('TITLE').subscribe(res => this.titleService.setTitle(res));
  }

}
