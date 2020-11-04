import { HttpHeaders } from '@angular/common/http';

function getHeaderFromResponse(headers: HttpHeaders, name: string): string {
  return headers.get(name);
}

export function getTotalCountFromRes(headers: HttpHeaders): number {
  const totalCount = getHeaderFromResponse(headers, 'X-Pagination-Total-Count');
  return totalCount ? +totalCount : 0;
}

export function getPageCountFromRes(headers: HttpHeaders): number {
  const totalCount = getHeaderFromResponse(headers, 'X-Pagination-Page-Count');
  return totalCount ? +totalCount : 0;
}

