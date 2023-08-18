import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private alertController: AlertController, private tarefaService: TarefaService) {}

  async showAdd() {
    const alert = await this.alertController.create({
      cssClass: 'alert-box',
      header: 'Informe a tarefa',
      inputs: [{
        name: 'Tarefa',
        type: 'text',
        placeholder: 'Nome da tarefa'
      }],
      buttons: [{
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'cancel-button',
        handler: () => {

        }
      }, {
        text: 'Salvar',
        cssClass: 'save-button',
        handler: (tarefa) => {
          console.log(tarefa)
          this.tarefaService.salvar(tarefa)
        }
      }]
    })

    await alert.present()
  }
}
