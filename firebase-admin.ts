// import { 
//     initializeApp,
//     getApps,
//     App,
//     getApp,
//     cert,
//  } from "firebase-admin/app";

//  import { getFirestore } from "firebase-admin/firestore";

//  const serviceAccount = require("./service_key.json");

//  let app: App;

//  if (getApps().length ==0) {
//     app = initializeApp({
//         credential: cert(serviceAccount),
//     }); 
//  } else {
//     app = getApp();
//  }

//  const adminDb = getFirestore(app);

//  export { app as adminApp, adminDb };



import { cert, initializeApp, getApp, getApps, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

function getServiceAccount() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (err) {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is set but contains invalid JSON");
    }
  }
  // Local development fallback (only if you have service_key.json locally)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("./service_key.json");
}

const serviceAccount = getServiceAccount();

if (!getApps().length) {
  app = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);
export { adminDb };