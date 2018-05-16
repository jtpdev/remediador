import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Configuracao } from '../../models/configuracao';
import { DaoProvider } from '../dao/dao';
import { SQLiteObject } from '@ionic-native/sqlite';
import { ProvedorPadrao } from '../provedor-padrao';

@Injectable()
export class ConfiguracaoProvider implements ProvedorPadrao<Configuracao> {

  constructor(
    private daoProvider: DaoProvider
  ) {
  }

  public save(configuracao: Configuracao) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'insert into configuracao (pararcomescaneamento) values (?)';
        let data = [configuracao.pararComEscaneamento];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(configuracao: Configuracao) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'update configuracao set pararcomescaneamento = ? where id = ?';
        let data = [configuracao.pararComEscaneamento, configuracao.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public delete(id: number) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'delete from configuracao where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public find(id: number) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'select * from configuracao where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let configuracao = new Configuracao();
              configuracao.id = item.id;
              configuracao.pararComEscaneamento = item.pararcomescaneamento;
 
              return configuracao;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public list() {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'select * from configuracao';
        var data: any[] = [];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            let configuracoes: Configuracao[] = [];
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                let item = data.rows.item(i);
                let configuracao = new Configuracao();
                configuracao.id = item.id;
                configuracao.pararComEscaneamento = item.pararcomescaneamento;
                configuracoes.push(configuracao);
              }
            }
            return configuracoes;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
