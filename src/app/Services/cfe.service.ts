import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token.service";
const  APIUrlCFE ="http://localhost:8081/api/cfe";

@Injectable({
  providedIn: 'root'
})
export class CfeService  extends DataService{

  userId : number =0;
  constructor(http:HttpClient,private httpPrivate: HttpClient,private tokenService : TokenStorageService){
    super(APIUrlCFE,http);

  }
  generatePDF(formData: FormData, cvaeId: number): Observable<Blob> {
    this.userId = this.tokenService.getUser() as number;
    return this.httpPrivate.post(`${APIUrlCFE}/fill-pdf/${cvaeId}/${this.userId}`, formData, {
      responseType: 'blob'
    });
  }

}
