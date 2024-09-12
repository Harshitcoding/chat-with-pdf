import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJ6iT4gEQrsNUd4Px6lws46CXu906SK54",
  authDomain: "chat-with-pdf-50ee7.firebaseapp.com",
  projectId: "chat-with-pdf-50ee7",
  storageBucket: "chat-with-pdf-50ee7.appspot.com",
  messagingSenderId: "598916559271",
  appId: "1:598916559271:web:ba2971f2b8086aaf6e4682"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app)
const storage = getStorage(app)

export {db,storage}