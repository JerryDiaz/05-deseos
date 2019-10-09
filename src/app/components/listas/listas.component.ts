import { Component, OnInit, Input, ViewChildren } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChildren(IonList) lista: IonList;
  @Input() terminada = true;

  constructor(public deseosService:DeseosService,
              private router:Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  
  listaSeleccionada(lista: Lista){
    if(this.terminada){
      this.router.navigateByUrl(`tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`tabs/tab1/agregar/${lista.id}`);
    }    
  }

  borrarLista(item: Lista){
    this.deseosService.borrarLista(item);
  }

  async editarLista(item:Lista){
    const alert = await this.alertCtrl.create({
      header: 'Editar lista',
      inputs: [
          {
            name: 'titulo',
            type: 'text',
            value: item.titulo            
          }
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=> {
            this.lista.closeSlidingItems();            
          }
         },
          {
            text: 'Editar',
            handler:(data)=>{                 
               console.log(data);
               if(data.titulo.lenght ===0){
                return;
               }
              
               item.titulo = data.titulo;
               this.deseosService.guardarStorage();
               this.lista.closeSlidingItems();
          } 
       }
      ]
    });

    alert.present();
  }


}
