import { Component } from '@angular/core';
import { AlertController } from "@ionic/angular";
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
                  if(data.titulo.lenght ===0){
                    return;
                  }   
                 const listaId =  this.deseosService.crearLista(data.titulo);
                 this.router.navigateByUrl(`tabs/tab1/agregar/${listaId}`);
             } 
          }
      ]
     });

     alert.present();
  }

  
}
