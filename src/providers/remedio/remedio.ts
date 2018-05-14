import { Injectable } from '@angular/core';

import { SQLiteObject } from '@ionic-native/sqlite';
import { DaoProvider } from '../dao/dao';
import { Remedio } from '../../models/remedio';

@Injectable()
export class RemedioProvider {

  constructor(
    private daoProvider: DaoProvider
  ) { }
 
  public save(remedio: Remedio) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'insert into remedio (nome, horario, vezesaodia, qtddias, codigobarras) values (?, ?, ?, ?, ?)';
        let data = [remedio.nome, remedio.horario, remedio.vezesAoDia, remedio.qtdDias, remedio.codigoBarras];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(remedio: Remedio) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'update remedio set nome = ?, horario = ?, vezesaodia = ?, qtddias = ?, codigobarras = ? where id = ?';
        let data = [remedio.nome, remedio.horario, remedio.vezesAoDia, remedio.qtdDias, remedio.codigoBarras, remedio.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public delete(id: number) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'delete from remedio where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public find(id: number) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'select * from remedio where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let remedio = new Remedio();
              remedio.id = item.id;
              remedio.nome = item.nome;
              remedio.horario = item.horario;
              remedio.vezesAoDia = item.vezesaodia;
              remedio.qtdDias = item.qtddias;
              remedio.codigoBarras = item.codigobarras;
 
              return remedio;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public list(active: boolean, name: string = null) {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'select * from remedio where id = ?';
        var data: any[] = [active ? 1 : 0];
 
        // filtrando pelo nome
        if (name) {
          sql += ' and p.name like ?'
          data.push('%' + name + '%');
        }
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let remedios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                let item = data.rows.item(i);
                let remedio = new Remedio();
                remedio.id = item.id;
                remedio.nome = item.nome;
                remedio.horario = item.horario;
                remedio.vezesAoDia = item.vezesaodia;
                remedio.qtdDias = item.qtddias;
                remedio.codigoBarras = item.codigobarras;
                remedios.push(remedio);
              }
              return remedios;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
