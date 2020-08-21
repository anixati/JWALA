import * as firebase from "firebase/app";

export class fbAuth {
    private readonly _auth: firebase.auth.Auth;
    constructor(auth: firebase.auth.Auth) {
        this._auth = auth;
    }
    get Svc() {
        return this._auth;
    }
    get User() {
        return this._auth.currentUser;
    }
    async signout() {
        return await this._auth.signOut();
    }
    async signIn(email: string, pwd: string) {
        return await this._auth.signInWithEmailAndPassword(email, pwd);
    };

    async resetPwd(email: string) {
        return await this._auth.sendPasswordResetEmail(email);
    };
}

