import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  server_node : string= 'http://186.66.154.235:1025/api_prueba/';

  constructor(public http:HttpClient) { }

  private refresh=new Subject<void>();

  get Refreshrequired(){
    return this.refresh;
  }

  get(metodo, body){
    return this.http.get(this.server_node+metodo, body)
  }

  post(metodo, body){
    return this.http.post(this.server_node+metodo, body)
  }

  put(metodo, body, id){
    return this.http.put(this.server_node+metodo+'/'+id, body)
  }
}

