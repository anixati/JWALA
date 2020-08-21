import admin, { ServiceAccount } from "firebase-admin";
import { fstore } from "./db";

export function Initialise() {
    try {
        const svcKey = require("../api-key.json");
        var obj = <ServiceAccount>svcKey;
        admin.initializeApp({ credential: admin.credential.cert(obj) })
        fstore.ctx.initialize();
        console.log('fb:init-OK');
    } catch (ex) {
        console.log('fb:init-FAIL', ex);
    }
}
