import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../servicios/conexion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  categorias:any='';
  id_categoria='';
  productos:any='';
  producto:any='';
  precio:any='';
  id_producto='';
  descripcion:any='';
  descuento:any='';
  nombre:any='';
  bandera:any=0;
  dropdown:any='Categoría';
  publico:any=''

  constructor(private conexion: ConexionService, private router:Router) {}

  ngOnInit(): void {
    this.ver_categorias();
    this.consultar_productos();
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

  consultar_productos(){
    let metodo='consultar_productos'
      let body={

      }
      return new Promise(resolve=>{
        this.conexion.get(metodo, body).subscribe((res: any)=>{
          if(res.data[0]==undefined){
            Swal.fire('','No existen registros de productos','warning')
          }else{
            this.productos=res.data[0];
            console.log(this.productos)
          }
        },
        error => {
          console.log(error);
        });
      });
  }

  guardar_producto(){
    if(this.producto==''){
      Swal.fire('','Ingrese el producto','warning')
    }else if(this.precio==''){
      Swal.fire('','Ingrese el precio','warning')
    }else if(this.id_categoria==''){
      Swal.fire('','Seleccione una categoría ','warning')
    }else{
      let metodo='guardar_producto'
      let body={
        'producto': this.producto,
        'precio': this.precio,
        'id_categoria': this.id_categoria
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
            this.consultar_productos();
          }
        },
        error => {
          console.log(error);
        });
      });
    }
  }

  actualizar_producto(){
    if(this.producto==''){
      Swal.fire('','Ingrese el producto','warning')
    }else if(this.precio==''){
      Swal.fire('','Ingrese el precio','warning')
    }else if(this.id_categoria==''){
      Swal.fire('','Seleccione una categoría ','warning')
    }else{
      let metodo='actualizar_producto'
      let id=this.id_producto
      let body={
        'producto': this.producto,
        'precio': this.precio,
        'id_categoria': this.id_categoria
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
            this.consultar_productos();
          }
        },
        error => {
          console.log(error);
        });
      });
    }
  }

  click_categoria(cat){
    console.log(cat)
    this.dropdown=cat.nombre
    this.nombre=cat.nombre;
    this.descripcion=cat.descripcion;
    this.id_categoria=cat.id_categoria;
    this.descuento=cat.descuento;
    this.publico=this.precio-(this.precio*(this.descuento/100))
  }

  click_producto(prod){
    this.producto=prod.producto;
    this.precio=prod.precio;
    this.id_producto=prod.id_producto;
    this.nombre=prod.nombre;
    this.descuento=prod.descuento;
    this.dropdown=this.nombre;
    this.bandera=1
    this.publico=this.precio-(this.precio*(this.descuento/100))
  }

  guardar(){
    if(this.bandera==0){
      this.guardar_producto()
    }else if(this.bandera==1){
      this.actualizar_producto();
    }
  }

  limpiar(){
    this.dropdown='Categoría'
    this.producto=''
    this.precio=''
    this.descuento=''
    this.id_categoria=''
    this.publico=''
    this.bandera=0
  }



}
