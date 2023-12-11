import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {

  categorias:any;
  descripcion:any='';
  descuento:any='';
  nombre:any='';
  id_categoria:any='';
  bandera:any=0;

  constructor(private conexion: ConexionService, private router:Router) {}

  ngOnInit(): void {
    this.ver_categorias();
  }

  ver_categorias(){
    let metodo='ver_categorias'
      let body={

      }
      return new Promise(resolve=>{
        this.conexion.get(metodo, body).subscribe((res: any)=>{
          if(res.data[0]==undefined){
            Swal.fire('','No existen registros de categorías','warning')
          }else{
            this.categorias=res.data[0];
            console.log(this.categorias)
          }
        },
        error => {
          console.log(error);
        });
      });
  }

  guardar_categoria(){
    if(this.nombre==''){
      Swal.fire('','Ingrese el nombre','warning')
    }else if(this.descripcion==''){
      Swal.fire('','Ingrese la descripcion','warning')
    }else if(this.descuento==''){
      Swal.fire('','Ingrese el descuento','warning')
    }else{
      let metodo='guardar_categoria'
      let body={
        'nombre': this.nombre,
        'descripcion': this.descripcion,
        'descuento': this.descuento
      }
      return new Promise(resolve=>{
        this.conexion.post(metodo, body).subscribe((res: any)=>{
          if(res.status==false){
            Swal.fire('','Error al guardar','warning')
          }else{
            console.log(res)
            Swal.fire('','Éxito al guardar','success')
            this.limpiar()
            this.ver_categorias();
          }
        },
        error => {
          console.log(error);
        });
      });
    }
  }

  actualizar_categoria(){
    if(this.nombre==''){
      Swal.fire('','Ingrese el nombre','warning')
    }else if(this.descripcion==''){
      Swal.fire('','Ingrese la descripcion','warning')
    }else if(this.descuento==''){
      Swal.fire('','Ingrese el descuento','warning')
    }else{
      let metodo='actualizar_categoria'
      let id=this.id_categoria
      let body={
        'nombre': this.nombre,
        'descripcion': this.descripcion,
        'descuento': this.descuento
      }
      return new Promise(resolve=>{
        this.conexion.put(metodo, body, id).subscribe((res: any)=>{
          if(res.status==false){
            Swal.fire('','Error al actualizar','warning')
          }else{
            console.log(res)
            Swal.fire('','Éxito al actualizar','success')
            this.limpiar()
            this.ver_categorias();
          }
        },
        error => {
          console.log(error);
        });
      });
    }
  }

  guardar(){
    if(this.bandera==0){
      this.guardar_categoria()
    }else if(this.bandera==1){
      this.actualizar_categoria()
    }
  }

  click_categoria(cat){
    console.log(cat)
    this.nombre=cat.nombre;
    this.descripcion=cat.descripcion;
    this.id_categoria=cat.id_categoria;
    this.descuento=cat.descuento;
    this.bandera=1;
  }

  limpiar(){
    this.nombre='';
    this.descripcion='';
    this.descuento='';
    this.bandera=0;
  }

}
