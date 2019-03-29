import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: any;
  authForm: FormGroup;
  usrData: any;
  check: boolean = true;
  regId:any;

  constructor(public events: Events, private fb: FormBuilder, public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams, public http: HTTP,
    private loadingCtrl: LoadingController, private storage: Storage, 
    public push: Push
    ) {

    this.authForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'password': [null, Validators.compose([Validators.required])]
    });
  }
 

  login() {

    const options: PushOptions = {
      android: {
        senderID: '964030697866'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
       this.regId= data.registrationId;    

       let val = {

        'token': this.regId,
        'username': this.username,
        'password': this.password,
        'db': 'demo'
        
      };
      let headers = {
        'Content-Type': 'application/json'
      };
  
      this.http.post('http://192.168.1.208:8086/firebase/registeration', val, headers)
        .then((data) => {    
        console.log(data);
        this.navCtrl.setRoot(HomePage);
        })
        .catch((error) => {
         console.log(error);
        });   
      
      });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {
              //TODO: Your logic here

            }
          }]
        });
        confirmAlert.present();
      } else {
        //if user NOT using app and push notification comes
        //TODO: Your logic on click of push notification directly

        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));


    // let loader = this.loadingCtrl.create({
    //   spinner: 'crescent',
    //   content: "Loading..",
    // });
    // loader.present();

    // let data = {
    //   'username': this.username,
    //   'password': this.password,
     
    // };
    // let headers = {
    //   'Content-Type': 'application/json'
    // };

    // this.http.post('/api/login', data, headers)
    //   .then((data) => {
    //     let val = JSON.parse(data.data);
    //     if (val.resp == "0") {
    //       const alert = this.alertCtrl.create({
    //         title: 'Error!',
    //         subTitle: 'Invalid Login Credential',
    //         buttons: ['OK']
    //       });
    //     }
    //     else if (val.resp == "1") {
    //       this.usrData = { username: val.username, password: val.password, uid: val.uid };
    //       this.storage.set('userData', this.usrData);
    //       this.storage.set('loginCheck', this.check);
    //       this.navCtrl.setRoot(HomePage);
    //     }
    //     loader.dismiss();
    //   })
    //   .catch((error) => {
    //     const alert = this.alertCtrl.create({
    //       title: 'Error!',
    //       subTitle: 'Please Try Again',
    //       buttons: ['OK']
    //     });
    //     alert.present();
    //   });
    // loader.dismiss();
  } 
}
