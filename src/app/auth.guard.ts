import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import {Observable} from 'rxjs'
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authSrv: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      /*if (!this.authSrv.logged)return this.router.createUrlTree(["/login"]);
      else return true;*/
                return this.authSrv.isLoggedIn$.pipe(
                                                      take(1),
                                                      map((isLoggedin) => {
                                                                            if (isLoggedin) {
                                                                                              return true;
                                                                                            }
                                                                            return this.router.createUrlTree(["/login"]);
                                                                            })
    );

  }
}
