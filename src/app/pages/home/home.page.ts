import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  tarefaCollection: any[] = []
  constructor(private alertController: AlertController, private tarefaService: TarefaService, private actionSheetCtrl: ActionSheetController) {}

  ionViewDidEnter(){  //ngOnInit
    this.listarTarefas()
  }

  listarTarefas(){
    this.tarefaCollection = this.tarefaService.listar()
  }

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
          this.listarTarefas()
        }
      }]
    })

    await alert.present()
  }

  excluir(item:any){
    this.tarefaService.excluir(item)
    this.listarTarefas()
  }

  async openActions(tarefa: any){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'O que deseja fazer?',
      buttons: [{
        text: tarefa.feito == 'Pendente' ? 'Marcar como pendente' : 'Marcar como concluida',
        icon: tarefa.feito ? 'radio-button-off' : 'checkmark-circle',
        handler: () => {
          tarefa.feito = !tarefa.feito;
          this.tarefaService.atualizar(tarefa)
          this.listarTarefas()
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
      }]
    }
    )
    await actionSheet.present()
  }
}
