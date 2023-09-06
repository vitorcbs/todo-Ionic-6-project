import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefasList: any[] = [];
  key = 'tarefasList';

  constructor() {}

  salvar(tarefa: any) {
    tarefa.feito = 'Pendete';

    //Obter info do local storage
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      this.tarefasList.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefasList));
    } else {
      let collection: any[] = JSON.parse(value);
      collection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(collection));
    }
  }

  listar() {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return [];
    }

    let collection: any[] = JSON.parse(value);
    return collection;
  }

  excluir(tarefa: any) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    }

    let itemCollection: any[] = JSON.parse(value);

    let resultItemCollection = itemCollection.filter((item) => {
      item.tarefa != tarefa.tarefa;
    });
    console.log(resultItemCollection);
    localStorage.setItem(this.key, JSON.stringify(resultItemCollection));
  }

  atualizar(tarefa: any) {
    //Obter info do local storage
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    } else {
      let collection: any[] = JSON.parse(value);
      collection.forEach(item => {
        if (item.tarefa == tarefa.tarefa){
          item.feito = tarefa.feito;
        }
      })

      let tarefaUpdate: any = collection.filter((item) => {
        return item.tarefa == tarefa.tarefa;
      });
      tarefaUpdate.feito = tarefa.feito;
      let itemRemovidoCollection: any[] = collection.filter((item) => {
        return item.tarefa != tarefa.tarefa;
      });
      itemRemovidoCollection.push(tarefaUpdate)
      localStorage.setItem(this.key, JSON.stringify(collection));
    }
  }
}
