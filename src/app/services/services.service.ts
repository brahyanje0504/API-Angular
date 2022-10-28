import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person, Pet } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  TraerPersonas(): Observable<HttpResponse<Person[]>>{
    return this.http.get<Person[]>("http://localhost:3000/mostrar", {observe: 'response'})
  }

  TraerPersona(id: string): Observable<HttpResponse<Person[]>>{
    return this.http.get<Person[]>(`http://localhost:3000/mostrar/${id}`, {observe: 'response'})
  }

  GuardarPersona(persona: Person):Observable<HttpResponse<any>>{
    return this.http.post<any>(`http://localhost:3000/persona`, persona, { headers: this.httpOptions.headers, observe: 'response' }
  );
  }

  EditarPersona(persona: Person):Observable<HttpResponse<any>>{
    return this.http.put<any>('http://localhost:3000/modificar', persona, { headers: this.httpOptions.headers, observe: 'response' } 
  );
  }

  EliminarPersonas(id: string): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`http://localhost:3000/eliminar/${id}`, {observe: 'response'})
  }


  
  TraerMascotas(id: string|null): Observable<HttpResponse<Pet[]>>{
    return this.http.get<Pet[]>(`http://localhost:3000/mascota/${id}`, {observe: 'response'})
  }

  TraerMascota(id: string|null, key: string): Observable<HttpResponse<Pet[]>>{
    return this.http.get<Pet[]>(`http://localhost:3000/mascota/${id}/${key}`, {observe: 'response'})
  }

  GuardarMascota(mascota: Pet):Observable<HttpResponse<any>>{
    return this.http.post<any>(`http://localhost:3000/mascota`, mascota, { headers: this.httpOptions.headers, observe: 'response' }
  );
  }

  EditarMascota(mascota: Pet, id: string|null):Observable<HttpResponse<any>>{
    return this.http.put<any>(`http://localhost:3000/modificarMascota/${id}`, mascota, { headers: this.httpOptions.headers, observe: 'response' } 
  );
  }

  EliminarMascota(id: string|null, key: string): Observable<HttpResponse<any>>{
    return this.http.delete<any>(`http://localhost:3000/eliminarMascota/${id}/${key}`, {observe: 'response'})
  }


}

