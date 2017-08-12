import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { Http, Headers, RequestOptions } from "@angular/http";

import 'rxjs/add/operator/map';
import firebase from 'firebase';
import { Page1Page } from "../page1/page1";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})





export class HomePage {

  userProfile: any = null;

  constructor(public facebook: Facebook, public navCtrl: NavController ,public   http: Http) {
this.navCtrl=navCtrl;
  }
  go() {
    this.navCtrl.setRoot(Page1Page);
  }
  facebookLogin() {

    this.facebook.login(['email']).then((response) => {

      const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

      firebase.auth().signInWithCredential(facebookCredential)
        .then((facebookData) => {
          var headers = new Headers();
          headers.append("Accept", "applications/json");
          headers.append("Content-Type", "application/json");

          let options = new RequestOptions({ headers: headers });

          this.http.get("http://ip-api.com/json", options)
            .map(res => {
              return res.json();
            }).subscribe(data => {
              let localUser = {
                countryCode: data.countryCode,
                name: facebookData.displayName,
                email: facebookData.email,
                photo: facebookData.photoURL,
                provider_id: facebookData.uid,
                latitude: data.lat,
                longitude: data.lon,
                provider: 'facebook'
              };

              this.http.post("http://bluepenlabs.com/projects/food-app/public/api/user/social", localUser, options)
                .map(res => {
                  return res.json();
                }).subscribe(
                RegisteredUser => {
                  // TEST IF DATA IS ERROR
                  localStorage.setItem('user', JSON.stringify(RegisteredUser));
                  this.navCtrl.setRoot(Page1Page);
                }, (error) => alert(JSON.stringify(error))
                )
            });
          console.log("Firebase success: " + JSON.stringify(facebookData));
          this.userProfile = facebookData;
        })

        .catch((error) => {

          alert("Firebase failure: " + JSON.stringify(error));

        });



    }).catch((error) => { alert("Facebook error" + error) });

  }
}

