import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token.service";
import {DataService} from "./data.service";
import {Observable} from "rxjs";
const  APIUrlHistorique ="http://localhost:8081/api/historique";

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService extends DataService{
  constructor(http:HttpClient,private httpPrivate: HttpClient){
    super(APIUrlHistorique,http);
  }
  downloadFile(fileId: number): Observable<Blob> {
    return this.httpPrivate.get(`${APIUrlHistorique}/download/${fileId}`, { responseType: 'blob' });
  }
}
