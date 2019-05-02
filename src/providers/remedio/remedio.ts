import { Injectable } from '@angular/core';

import { SQLiteObject } from '@ionic-native/sqlite';
import { DaoProvider } from '../dao/dao';
import { Remedio } from '../../models/remedio';
import { ProvedorPadrao } from '../provedor-padrao';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from 'ionic-angular';

@Injectable()
export class RemedioProvider implements ProvedorPadrao<Remedio> {

  constructor(
    private daoProvider: DaoProvider,
    private localNotifications: LocalNotifications,
    public platform: Platform
  ) { }

  public save(remedio: Remedio) {
    this.configurarNotificacoes(remedio);
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'insert into remedio (nome, horario, vezesaodia, qtddias, codigobarras) values (?, ?, ?, ?, ?)';
        let data = [remedio.nome, remedio.horario, remedio.vezesAoDia, remedio.qtdDias, remedio.codigoBarras];

        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public configurarNotificacoes(remedio: Remedio) {
    for (let i = 0; i <= remedio.qtdDias; i++) {
      for (let j = 0; j <= remedio.vezesAoDia; j++) {
        let horas = (3600 * 1000 * (24 / remedio.vezesAoDia) * j);
        let dias = (3600 * 1000 * 24 * i);
        if (remedio.horario < new Date()) {
          horas = (3600 * 1000 * remedio.vezesAoDia * (j+1));
          dias = (3600 * 1000 * 24 * (i+1));
        }
        this.localNotifications.schedule({
          text: 'É hora de tomar: ' + remedio.nome,
          trigger: { at: new Date(remedio.horario.getTime() + dias + horas) },
          led: 'FF0000',
          sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
        });
      }
    }
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

  public list() {
    return this.daoProvider.get()
      .then((db: SQLiteObject) => {
        let sql = 'select * from remedio';
        var data: any[] = [];

        return db.executeSql(sql, data)
          .then((data: any) => {
            let remedios: Remedio[] = [];
            if (data.rows.length > 0) {
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
            }
            return remedios;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
