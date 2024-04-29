import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const ROLE_KEY = 'auth-role';
const ID_KEY = 'auth-id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  public saveToken(token : string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.saveRole();
  }
  public getUser():number | null{
    const jwtToken = this.getToken();
    const decodedToken: any = this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const userId = decodedToken != null ? decodedToken?.jti : null;
    console.log(userId);
    return userId;
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY) !== null ? window.sessionStorage.getItem(TOKEN_KEY) : null;
  }

  public getRole(){
    return window.sessionStorage.getItem(ROLE_KEY) !== null ? window.sessionStorage.getItem(ROLE_KEY) : null;
  }
  public saveRole(): void {
    const jwtToken = this.getToken();
    const decodedToken: any = this.getToken() != null ? jwtDecode(jwtToken as string) : null;
    const role = decodedToken != null ? decodedToken?.role : null;
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, role);
  }

}
