import { Component } from '@angular/core';
import { Lista } from '../../models/lista.model';
import { AlertController } from "@ionic/angular";
import { async } from '@angular/core/testing';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
 
  constructor( private alertCtrl: AlertController, public deseosService: DeseosService, private router: Router) {}

  async agregarLista(){
     //this.router.navigateByUrl('tabs/tab1/agregar');

     const alert = await this.alertCtrl.create({
        header: 'Nueva lista',
        inputs: [
            {
              name: 'titulo',
              type: 'text',
              placeholder: 'Nombre de la lista'
            }
        ],
        buttons: [
          {
             text: 'Cancelar',
             role: 'cancel',
             handler: ()=> {
               console.log('Cancelar');               
             }
            },
             {
               text: 'Crear',
               handler:(data)=>{
                  console.log(data);   
                  if(data.titulo.lenght ===0){
                    return;
                  }        
                  
                  this.deseosService.crearLista(data.titulo);
             } 
          }
      ]
     });

     alert.present();

  }
  
}
