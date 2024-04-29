import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppError } from './Commun/app-error';
import { BadInput } from './Commun/bad-input-error';
import { NotFoundError } from './Commun/not-found-error';
import {ForbiddenError} from "./Commun/forbidden-error";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private APIUrl: string,private http: HttpClient) { }

  // Get Method
  getAll(): Observable<any> {
    return this.http.get<any>(this.APIUrl);
  }

  // Get Method
  getAllWithpage(page : number,limit:number, search : string=""): Observable<any> {
    return this.http.get<any>(this.APIUrl+"?page="+page+"&limit="+limit+"&search="+search).pipe(
      map(data => data),
      catchError(this.handleError))
  }

  //get with id
  get(id: any): Observable<any> {
    return this.http.get(`${this.APIUrl}/${id}`).pipe(
      map(data => data),
      catchError(this.handleError));
  }
  // Update Method
  Update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.APIUrl}/${id}`, data);
  }

  //Create Method
  Create(data: any): Observable<any> {
    return this.http.post(this.APIUrl, data).pipe(
      map(data => data),
      catchError(this.handleError));
  }

  //Delete Method
  Delete(id: any): Observable<any> {
    return this.http.delete(`${this.APIUrl}/${id}`).pipe(
      map(data => data),
      catchError(this.handleError));
  }

  // Method Handle Error Known
  // You can add any Error you wawnt in Commun folder then use it here
  private handleError(error : Response){
    switch (error.status) {
      case 404: {
        return throwError(new NotFoundError(error));
      }
      case 400: {
        return throwError(new BadInput(error));
      }
      case 403: {
        return throwError(new ForbiddenError());
      }
      case 500: {
        return throwError(new AppError());
      }
      default: {
        return throwError(new AppError());
      }
    }
  }
}
