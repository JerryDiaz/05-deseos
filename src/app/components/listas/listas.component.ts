import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

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
            console.log('Cancelar');               
          }
         },
          {
            text: 'Editar',
            handler:(data)=>{                 
               console.log('Editar');
          } 
       }
      ]
    });

    alert.present();
  }


}
