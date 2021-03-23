import { HttpHeaders } from '@angular/common/http';

export function getHeaders(headers: HttpHeaders, name: string): string {
  return headers.get(name);
}

export function getTotalCountFromRes(headers: HttpHeaders): number {
  const totalCount = getHeaders(headers, 'X-Pagination-Total-Count');
  return totalCount ? +totalCount : 0;
}

export function getPageCountFromRes(headers: HttpHeaders): number {
  const totalCount = getHeaders(headers, 'X-Pagination-Page-Count');
  return totalCount ? +totalCount : 0;
}

