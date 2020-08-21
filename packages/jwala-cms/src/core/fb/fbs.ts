import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { fbAuth } from "./fbAuth";

export class Fbs {
    private static _ins: Fbs;
    private readonly _auth: fbAuth;
    private readonly _store: firebase.firestore.Firestore;
    static get ctx(): Fbs {
        if (!Fbs._ins)
            Fbs._ins = new Fbs();
        return Fbs._ins;
    }
    private constructor() {
        console.log('initailising ....!');
        this.setupFirebase();
        this._auth = new fbAuth(firebase.auth());
        this._store = firebase.firestore();
        console.log('Ok!');
    }
    private setupFirebase() {
        let config = {
            apiKey: process.env.FBS_KEY,
            authDomain: process.env.FBS_DOMAIN,
            databaseURL: process.env.FBS_DATABASE,
            projectId: process.env.FBS_PROJECT_ID,
            storageBucket: process.env.FBS_STORAGE_BUCKET,
            messagingSenderId: process.env.FBS_SENDER_ID,
            appId: process.env.FBS_APP_ID,
            measurementId: process.env.FBS_MEASUREMENT_ID
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    get Auth() {
        return this._auth;
    }
    get UserId() {
        return this._auth.User?.uid;
    }
    get Store() {
        return this._store;
    }
}


