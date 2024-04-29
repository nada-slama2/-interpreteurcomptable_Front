import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../Services/token.service';
import {EntryService} from "../Services/entry.service";

@Injectable({
  providedIn: 'root',
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(
    public tokenStorageService: TokenStorageService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorageService.getToken()) {
      console.log("Access Denied, You are already LoggedIn !!!")
      this.router.navigate(['/Dashboard/cvae'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
