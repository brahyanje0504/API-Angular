import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  TraerPersonas(): Observable<HttpResponse<Person[]>>{
    return this.http.get<Person[]>("http://localhost:3000/personas", {observe: 'response'})
  }

  TraerPersona(id: string): Observable<HttpResponse<Person[]>>{
    return this.http.get<Person[]>(`http://localhost:3000/personas/${id}`, {observe: 'response'})
  }
}

