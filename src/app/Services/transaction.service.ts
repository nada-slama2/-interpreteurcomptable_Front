import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
const  APIUrlTRANSACTION ="http://localhost:8081/api/transactions";

@Injectable({
  providedIn: 'root'
})
export class TransactionService  extends DataService{

  constructor(http:HttpClient){
    super(APIUrlTRANSACTION,http);
  }}
