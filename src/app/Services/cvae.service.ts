import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenStorageService} from "./token.service";
const  APIUrlCVAE ="http://localhost:8081/api/cvae";

@Injectable({
  providedIn: 'root'
})
export class CvaeService  extends DataService{
  userId : number =0;
  constructor(http:HttpClient,private httpPrivate: HttpClient,private tokenService : TokenStorageService){
    super(APIUrlCVAE,http);
    this.userId = this.tokenService.getUser() as number;
  }
  generatePDF(formData: FormData, cvaeId: number): Observable<Blob> {
    return this.httpPrivate.post(`${APIUrlCVAE}/fill-pdf/${cvaeId}/${this.userId}`, formData, {
      responseType: 'blob'
    });
  }


}
