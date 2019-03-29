import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { HTTP } from '@ionic-native/http';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  regId:any;
  saveUrl: string;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,  
    public alertCtrl: AlertController,private http: HTTP,
    public storage: Storage) {
            
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if (!this.platform.is('cordova')) {
      console.warn('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }
    
  }
 
 
}

