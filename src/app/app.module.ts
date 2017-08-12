import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { Page1Page } from "../pages/page1/page1";
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';


export const firebaseConfig={
  apiKey: "AIzaSyCHrJYo0q26g4ou47K_sbwa9IM_V4myADM",
    authDomain: "whichone-6494a.firebaseapp.com",
    databaseURL: "https://whichone-6494a.firebaseio.com",
    projectId: "whichone-6494a",
    storageBucket: "whichone-6494a.appspot.com",
    messagingSenderId: "159968486750"
}
firebase.initializeApp(firebaseConfig)
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Page1Page
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Page1Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    
    Facebook ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
