import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tva} from "../Models/Tva";
import {TokenStorageService} from "./token.service";
const  APIUrlTva ="http://localhost:8081/api/tva";

@Injectable({
  providedIn: 'root'
})
export class TvaService  extends DataService{
  userId : number =0;
  constructor(http:HttpClient,private httpPrivate: HttpClient,private tokenService : TokenStorageService){
    super(APIUrlTva,http);
    this.userId = this.tokenService.getUser() as number;
  }
  generatePDF(formData: FormData): Observable<Blob> {
    return this.httpPrivate.post(`${APIUrlTva}/fill-pdf/${this.userId}`, formData, {
      responseType: 'blob'
    });
  }

}
