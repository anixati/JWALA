import 'reflect-metadata';
import * as functions from 'firebase-functions';
import { runWith } from 'firebase-functions';
import { container } from 'tsyringe';
import { ApiService } from './services/apiService';
import { Initialise } from './startup';

Initialise();

//native functions
export const hc = functions.https.onRequest(async (rq, rs) => {
    let rval: {[k: string]: any} = {};
    rval.version ="1.0.0";
    rs.send(rval);
});

const expApp = container.resolve(ApiService).Create();
export const api = runWith({ memory: '2GB', timeoutSeconds: 30 })
    .https.onRequest(expApp);

// const gqlApp = container.resolve(GqlService).Create();
// export const gql = runWith({ memory: '2GB', timeoutSeconds: 30 })
//     .https.onRequest(gqlApp);