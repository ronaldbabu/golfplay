import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser'
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string;
  constructor(public navCtrl: NavController, private iab: InAppBrowser, private loadingCtrl: LoadingController, public platform: Platform, public statusBar: StatusBar, private push: Push, private alert: AlertController) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#3e497f');
      }
    });

    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          this.initPush();
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

  }

  //Push Notifications

  initPush() {
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => 
    {
        const confirm = this.alert.create({
          title: 'New Notification',
          message: notification.message,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'See',
              handler: () => {
                alert('See clicked');
              }
            }
          ]
        });
        confirm.present();
      
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  // Search Webpages

  openWebpage(url) {

    const options: InAppBrowserOptions = {
      zoom: 'no'
    }

    const browser = this.iab.create(url, '_self', options);

  }



}
