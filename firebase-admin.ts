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



// firebase-admin.ts
import { cert, initializeApp, getApp, getApps, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let app: App;

function getServiceAccount() {
  // Production / Netlify: use env var
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  }

  // Local development fallback only
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require("./service_key.json");
  }

  // Fail clearly in production if env var is missing
  throw new Error("FIREBASE_SERVICE_ACCOUNT is not set in production!");
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