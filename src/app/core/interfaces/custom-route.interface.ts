import { Route } from '@angular/router/router';

export interface CustomRoute extends Route {
  label?: string;
  isNavItem?: boolean;
  icon?: string;
}

export declare type CustomRoutes = CustomRoute[];
