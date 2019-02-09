import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

import * as fromRoot from '../app.reducer';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(
    route: ActivatedRouteSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
