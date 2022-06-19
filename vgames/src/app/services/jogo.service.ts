import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs'; 
import { SherlockDTO } from '../models/shelock-dto.model';

@Injectable({
  providedIn: 'root'
})
export class JogoService {
  private baseUrl = 'http://localhost:8080/';
  constructor(private http:HttpClient) { }

  getStartGame(): Observable<SherlockDTO> {  
    return this.http.get<SherlockDTO>(`${this.baseUrl}`+'start/');  
  }

  getPergunta (indice: number): Observable<SherlockDTO> {
    const url = `${this.baseUrl}pergunta/${indice}`;
    return this.http.get<SherlockDTO>(url);
  }

  setResposta(resposta: string): Observable<SherlockDTO> {
    const url = `${this.baseUrl}resposta/${resposta}`;
    return this.http.get<SherlockDTO>(url);
  } 
}
