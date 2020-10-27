import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoBr } from '../models/estado-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr(){
    return this.http.get<EstadoBr[]>('assets/dados/estadosBr.json').pipe();
  }

  getCargos(){
    return [
      { nome: 'dev', nivel: 'junior', desc: 'Dev Jr' },
      { nome: 'dev', nivel: 'pleno', desc: 'Dev Pl' },
      { nome: 'dev', nivel: 'senior', desc: 'Dev Sr' }
    ];
  }
}
