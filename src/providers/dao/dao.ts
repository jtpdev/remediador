import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DaoProvider {

  private readonly creates = [
    'CREATE TABLE IF NOT EXISTS remedio (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, horario TEXT, vezesaodia integer, qtddias integer, codigobarras integer)',
    'CREATE TABLE IF NOT EXISTS configuracao (id integer primary key AUTOINCREMENT NOT NULL, pararcomescaneamento integer)'
  ];

  constructor(
    private sqlite: SQLite
  ) { }

  public get() {
    return this.sqlite.create({
      name: 'remediador.db',
      location: 'default'
    });
  }

  public criar() {
    this.get().then(db => {
      this.criarTabelas(db);
      this.inserirConfiguracao(db);
    })
      .catch(e => console.log(e));
  }


  criarTabelas(db: SQLiteObject) {
    db.sqlBatch([
      this.creates
    ])
      .then(() => console.log('Tabela criada'))
      .catch(e => console.error('Erro ao criar a tabela', e));
  }

  private inserirConfiguracao(db: SQLiteObject) {
    db.sqlBatch([
      ['insert into configuracao (pararcomescaneamento) values (?)', [1]]
    ])
      .then(() => console.log('Configuração incluída com sucesso!'))
      .catch(e => console.error('Erro ao incluir configuração', e));
  }

}
