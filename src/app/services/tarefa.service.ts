import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefasList: any[] = [];
  key = 'tarefasList';

  constructor() {}

  salvar(tarefa: any, callback=null ){
    tarefa.status = 'Pendete'

    //Obter info do local storage
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined){
      this.tarefasList.push(tarefa)
      localStorage.setItem(this.key, JSON.stringify(this.tarefasList))
    } else {
      let collection : any[] = JSON.parse(value)
      collection.push(tarefa)
      localStorage.setItem(this.key, JSON.stringify(collection))
    }

    if(callback!=null){
      callback;
    }
  }
}
