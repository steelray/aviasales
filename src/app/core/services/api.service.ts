import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpObserve } from '../enums/http-observe.enum';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { HttpErrorService } from './http-error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // tslint:disable-next-line:variable-name
  private readonly _apiEndpoint = environment.apiEndpoint;

  constructor(
    public http: HttpClient,
    public httpErrorService: HttpErrorService) { }

  public get<Response>(
    url: string,
    options?: {
      params?: Record<string, any>,
      headers?: HttpHeaders,
      observe?: HttpObserve
    }
  ): Observable<Response> {
    return this.makeRequest('get', url, options);
  }

  public post<Body, Response>(
    url: string,
    body?: Body
  ): Observable<Response> {
    const requestBody = {
      method: url,
      params: body
    };
    return this.makeRequest('post', url, { body: requestBody }).pipe(
      map(res => {
        if (res.result) {
          return res.result;
        } else {
          this.httpErrorService.error$.next(res.error.message);
          throw new Error(res.error.message);
        }
      })
    );
  }

  public put<Body, Response>(
    url: string,
    body?: Body
  ): Observable<Response> {
    return this.makeRequest('put', url, { body });
  }

  public delete<Response>(
    url: string,
    options?: {
      params?: Record<string, any>,
      headers?: HttpHeaders,
      observe?: HttpObserve
    }
  ): Observable<Response> {
    return this.makeRequest('delete', url, options);
  }

  private makeRequest<Response>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    options?: {
      body?: any;
      headers?: HttpHeaders | {
        [header: string]: string | string[];
      };
      observe?: HttpObserve;
      params?: HttpParams | {
        [param: string]: string | string[];
      };
    }
  ): Observable<any> {
    return this.http.request(method, this.prepareUrl(url), options);
  }

  private prepareUrl(action: string): string {
    return this._apiEndpoint + '/' + action;
  }
}

