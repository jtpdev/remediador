import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListagemRemedioPage } from '../pages/listagem-remedio/listagem-remedio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = ListagemRemedioPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

