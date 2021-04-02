import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-webview-test',
  templateUrl: './webview-test.component.html',
  styleUrls: ['./webview-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WebviewTestComponent {
  @ViewChild('buyLinkTmpl', { static: false }) buyLinkTmpl: ElementRef;
  buyLink: string;
  constructor(
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  onBuy(): void {
    this.buyLink = null;
    this.request().subscribe(res => {
      this.buyLink = 'https://www.uzairways.com/uz';
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.buyLinkTmpl.nativeElement.click();
      });
    });
  }

  onBuyWindowOpen(): void {
    const windowOpen: any = window.open();
    this.request().subscribe(res => {
      windowOpen.location = 'https://www.uzairways.com/uz';
    });
  }

  private request(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

}
